const Event = require('../models/Event')
const User = require('../models/usuario')

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch (error) {
    next(error)
  }
}

// detalle de los eventos

const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      'attendees',
      'name email avatarLink'
    )
    if (!event) return res.status(404).json({ msg: 'NO find Event' })
    res.json(event)
  } catch (error) {
    next(error)
  }
}

const createEvent = async (req, res, next) => {
  try {
    const { title, date, location, description } = req.body

    const file = req.files && req.files[0]
    const eventImgUrl = file ? file.path : undefined

    const newEvent = await Event.create({
      title,
      date,
      location,
      description,
      eventImgUrl
    })
    res.status(201).json(newEvent)
  } catch (error) {
    next(error)
  }
}

const attendEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id
    const userId = req.user

    // 1 busco el evento
    const event = await Event.findById(eventId)
    if (!event) return res.status(404).json({ msg: 'Cannot find event' })

    // 2 check de que no este marcado
    if (event.attendees.includes(userId))
      return res.status(404).json({ msg: 'Attendance already confirmed' })

    // 3 usuario a atendidos
    event.attendees.push(userId)
    await event.save()

    // 4 a marcar en la propiedad eventsatt de el usuario ese evento
    await User.findByIdAndUpdate(
      userId,
      { $push: { eventsAttending: eventId } },
      { new: true }
    )

    res.json({ msg: 'Confirmed Attendance', event })
  } catch (error) {
    next(error)
  }
}

// funciones para Admins

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const updates = { ...req.body }
    if (req.file) updates.eventImgUrl = req.file.path

    const event = await Event.findByIdAndUpdate(id, updates, {
      new: true
    })

    if (!event) return res.status(404).json({ msg: 'Cant find event' })
    res.json(event)
  } catch (error) {
    next(error)
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findByIdAndDelete(id)
    if (!event) return res.status(404).json({ msg: 'Cant find event' })
    res.json({ msg: 'OK Deleted event' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  attendEvent,
  updateEvent,
  deleteEvent
}
