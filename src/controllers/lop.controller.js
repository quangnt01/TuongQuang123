const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lopService } = require('../services');

const createLop = catchAsync(async (req, res) => {
  const user = await lopService.createLop(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getLops = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await lopService.queryLops(filter, options);
  res.send(result);
});

const getLop = catchAsync(async (req, res) => {
  const user = await lopService.getLopById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateLop = catchAsync(async (req, res) => {
  const user = await lopService.updateLopById(req.params.userId, req.body);
  res.send(user);
});

const deleteLop = catchAsync(async (req, res) => {
  await lopService.deleteLopById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLop,
  getLops,
  getLop,
  updateLop,
  deleteLop,
};
