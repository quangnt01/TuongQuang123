const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    idStudent: {
        type: Number,
        required: true,
      },
    numberStudent: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);


/**
 * @typedef Lop
 */
const Lop = mongoose.model('Lop', userSchema);

module.exports = Lop;
