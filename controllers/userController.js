import * as UserModel from '../models/UserModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('userController');

const getUserInfo = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.user);
  const { user } = req;
  res.status(200).send({
    payload: {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  });
};

const register = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  await UserModel.save({
    username: req.body.username,
    email: req.body.email,
    hashPassword: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    imagePath: req.body.imagePath,
    gender: req.body.gender,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  logger.log('info', `Successfully registered: ${req.body.username}`);
  res.status(200).send({ payload: { message: 'Successfully registered' } });
};

export { getUserInfo, register };
