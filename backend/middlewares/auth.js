require('dotenv').config()
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const header = req.header('Authorization')

  console.log('auth header:', header)

  if (!header)
    return res
      .status(401)
      .json({ msg: 'No token provided, Imposible to authorize' })

  const [, token] = header.split(' ')

  if (!token) return res.status(401).json({ msg: 'Invalid token format' })

  console.log('JWT_SECRET in midd:', process.env.JWT_SECRET)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded ✅ Token :', decoded)

    req.user = decoded.id

    next()
  } catch (err) {
    console.error('jwt.verify error:', err)
    return res.status(401).json({ msg: 'Invalid Token' })
  }
}

module.exports = auth
