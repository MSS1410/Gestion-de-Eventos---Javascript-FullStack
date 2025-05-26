const User = require('../models/usuario')
const bcrypt = require('bcrypt')

const getLoggedUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user)

      .select('-password')
      .populate('eventsAttending', 'title date location eventImgUrl')
    // events attending establecido como array en schema User, connecto los valores del array para  mostrar en la seccion perfil
    if (!user) return res.status(404).json({ msg: 'No User find' })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const userId = req.params.id
    const { name, email, password, description } = req.body

    const updates = {}
    if (name) updates.name = name
    if (email) updates.email = email
    if (description) updates.description = description

    // hash para la nueva contra si se produce el cambio

    if (password) {
      //paso las capas de encriptacion
      const salt = await bcrypt.genSalt(10)
      //y lo añado al cajon de actualizados
      updates.password = await bcrypt.hash(password, salt)
    }

    // cambio de avatar
    console.log('user avatar', req.file)

    if (req.file) {
      updates.avatarLink = req.file.path
    }

    // actualizo el usuario, busco por el id de req.user y lo que se aplica es objeto updates,, runValidators --> sirve para forzar actualizacion de los valores modified en mongo

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true
    }).select('-password')

    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    console.log('✅ Avatar updated, new user:', user)

    return res.json(user)
  } catch (error) {
    console.error('❌ Error en updateMe controller:', error)

    return res.status(500).json({ error: error.message })
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    next(err)
  }
}

const getMyEvents = async (req, res, next) => {
  try {
    const user = await User.findById(req.user)
      .select('eventsAttending')
      .populate({
        path: 'eventsAttending',
        select: 'title date location eventImgUrl description attendees',
        //anido un populate para sacarle los link del avatar
        populate: {
          path: 'attendees',
          select: 'name avatarLink'
        }
      })
    //populate para los avatares

    if (!user) return res.status(404).json({ msg: 'User not Found' })
    res.json(user.eventsAttending)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ msg: 'Cant find user' })
    res.json({ msg: `Ok deleted user ${user.id}` })
  } catch (error) {
    next(error)
  }
}
const deleteSelf = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user)
    if (!user) return res.status(404).json({ msg: 'User not found' })
    res.json({ mesg: 'Your account has been deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getLoggedUser,
  updateMe,
  getAllUsers,
  getMyEvents,
  deleteUser,
  deleteSelf
}
