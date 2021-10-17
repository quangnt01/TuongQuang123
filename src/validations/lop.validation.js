const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createLop = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    idStudent: Joi.number().integer().required(),
    numberStudent: Joi.number().integer().required(),
  
  }),
};

const getLops = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLop = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateLop = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      idStudent: Joi.number().integer().required(),
      numberStudent: Joi.number().integer().required(),
    })
    .min(1),
};

const deleteLop = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLop,
  getLops,
  getLop,
  updateLop,
  deleteLop,
};
