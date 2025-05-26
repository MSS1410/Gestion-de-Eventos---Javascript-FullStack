const express = require('express')
const router = express.Router()
const isAdmin = require('../middlewares/isAdmin')

const auth = require('../middlewares/auth')
const upload = require('../utils/fileUpload')

const {
  getLoggedUser,
  updateMe,
  getAllUsers,
  getMyEvents,
  deleteUser,
  deleteSelf
} = require('../controllers/userControllers')

router.use(auth)

router.get('/', getAllUsers)
router.get('/myProfile', getLoggedUser)
router.get('/myEvents', getMyEvents)
router.put('/myProfile', upload.single('avatar'), updateMe)
router.put('/:id/updateMe', upload.single('avatar'), updateMe)

router.delete('/myProfile', deleteSelf)
router.delete('/:id/delete', isAdmin, deleteUser)

module.exports = router
// get me traera el perfil logeado,
//put selecciona al usuario mediante el id q recibe, upload saca de fileupload la conexion con cloudynary.Se aplica la funcion updateMe, la cual recorre los campos del usuario en busca de actualizaciones. Si recibe nuevo path para el avatar este se actualiza con name "avatar"
