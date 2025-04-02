const mongoose = require('mongoose');
const { ROLES } = require('../config/constants');
const bCrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: ROLES.USER,
      validate: (value) => Object.values(ROLES).some((role) => value === role),
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        return !value || /^[^(\s@)]+@\w{2,}\.\w{2,}$/.test(String(value));
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.verifyPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.connection.model('Users', userSchema, 'users');

module.exports = User;
