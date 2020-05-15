const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  settings: {
    autosync: {
      type: Boolean,
      default: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  notes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'notes',
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', UserSchema);

const UserType = null;

module.exports = { User, UserType };
