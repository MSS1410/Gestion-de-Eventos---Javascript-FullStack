const User = require('../models/usuario')

module.exports = async function isAdmin(req, res, next) {
  const user = await User.findById(req.user)
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ msg: 'Acces denied, only Admin ' })
  }
  next()
}
