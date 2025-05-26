const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const upload = require('../utils/fileUpload')

const isAdmin = require('../middlewares/isAdmin')

const {
  getEvents,
  getEventById,
  createEvent,
  attendEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController')

router.get('/get', getEvents)
router.get('/:id', getEventById)

router.use(auth)
//apuntarse a evento
router.post('/:id/attend', attendEvent)

// ruteo para admins
router.post('/create', isAdmin, upload.any(), createEvent)
router.put('/:id/update', isAdmin, upload.single('eventImgUrl'), updateEvent)
router.delete('/:id/delete', isAdmin, deleteEvent)

module.exports = router
