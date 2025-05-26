const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: false,
      unique: true
    },
    avatarLink: {
      type: String,
      default: ''
    },
    eventsAttending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
