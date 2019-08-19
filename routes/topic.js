import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as topicController from '../controllers/topicController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.get('', asyncMiddleware(topicController.getTopics));
router.post('', asyncMiddleware(topicController.addTopic));
router.get('/:topicId', asyncMiddleware(topicController.getTopicById));
router.get('/:topicId/comments', asyncMiddleware(commentController.getTopicComments));
router.post('/:topicId/comments', asyncMiddleware(commentController.addTopicComment));

export default router;
