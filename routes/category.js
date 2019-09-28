import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as categoryController from '../controllers/categoryController';
import * as topicController from '../controllers/topicController';

const router = express.Router();

router.get('/:categoryId/topics', asyncMiddleware(topicController.getTopicsByCategoryId));
router.get('', asyncMiddleware(categoryController.getCategories));
router.post('', asyncMiddleware(categoryController.addCategory));
router.get('/:urlId', asyncMiddleware(categoryController.getCategoryByUrlId));

export default router;
