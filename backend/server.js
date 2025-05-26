require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')
const User = require('./models/usuario')

// marcar al usuario admin
async function setAdmin() {
  const user = await User.findOne({ email: 'etomic_off_admin@etomic.com' })
  if (user) {
    user.role = 'admin'
    await user.save()
    console.log('User log set as Admin', user)
  }
}

connectDB().then(setAdmin)
const app = express()

app.use(cors())
app.use(express.json())

// rutas
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT_BACKEND || 5000

app.listen(PORT, () => {
  console.log(`🎧 eTOMIC GDE  en: http://localhost:${PORT}`)
})
