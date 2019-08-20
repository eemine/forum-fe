import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/login', asyncMiddleware(authController.logIn));

export default router;
