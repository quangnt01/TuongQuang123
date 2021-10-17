const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createStudent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    idSv: Joi.number().integer().required(),
    address: Joi.string().required(),
    born: Joi.number().integer().required(),
  }),
};

const getStudents = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      idSv: Joi.number(),
      address: Joi.string(),
      born: Joi.number(),
    })
    .min(1),
};

const deleteStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
