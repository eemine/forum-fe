import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('authController');

const logIn = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.body);
  const user = await UserModel.getUserByUsername(req.body.username);
  if (user) {
    const isPasswordsEqual = await UserModel.comparePassword({
      password: req.body.password,
      hashPassword: user.hashPassword,
    });
    if (isPasswordsEqual) {
      const token = jwt.sign(
        {
          data: { username: user.username },
        },
        process.env.JWT_SECRET,
        { expiresIn: '6h' },
      );
      logger.log('info', `Successfully logged in: ${user.username}`);
      res.status(200).send({ payload: { message: 'Successfully logged in', token } });
    } else {
      logger.log('debug', 'Login failed: password is invalid');
      throw new AppError('Wrong user credentials, password is invalid', 400);
    }
  } else {
    logger.log('debug', 'Login failed: username is invalid');
    throw new AppError('Wrong user credentials, username is invalid', 400);
  }
};

export { logIn };
