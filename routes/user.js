import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', asyncMiddleware(userController.register));

export default router;
