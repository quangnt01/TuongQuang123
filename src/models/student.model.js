const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    idSv: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    born: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The student's email
 * @param {ObjectId} [excludeStudentId] - The id of the student to be excluded
 * @returns {Promise<boolean>}
 */
studentSchema.statics.isEmailTaken = async function (email, excludeStudentId) {
  const student = await this.findOne({ email, _id: { $ne: excludeStudentId } });
  return !!student;
};

/**
 * Check if password matches the student's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
studentSchema.methods.isPasswordMatch = async function (password) {
  const student = this;
  return bcrypt.compare(password, student.password);
};

studentSchema.pre('save', async function (next) {
  const student = this;
  if (student.isModified('password')) {
    student.password = await bcrypt.hash(student.password, 8);
  }
  next();
});

/**
 * @typedef Student
 */
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
