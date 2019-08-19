import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('authController');

const register = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  await UserModel.save({
    username: req.body.username,
    email: req.body.email,
    hashPassword: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    imagePath: req.body.imagePath
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  logger.log('info', `Successfully registered: ${req.body.username}`);
  res.status(200).send({ payload: { message: 'Successfully registered' } });
};

export { register };
