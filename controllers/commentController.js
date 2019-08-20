import * as CommentModel from '../models/CommentModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('commentController');

const getTopicComments = async (req, res) => {
  logger.log('debug', 'getTopicComments: %j', req.body);
  const comments = await CommentModel.getCommentsByTopicId(req.params.topicId);
  res.status(200).send({ payload: { comments } });
};

const addTopicComment = async (req, res) => {
  logger.log('debug', 'addTopicComment: %j', req.body);
  await CommentModel.save({
    userId: req.user._id,
    text: req.body.text,
    topicId: req.params.topicId,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  res.status(201).send();
};

export { getTopicComments, addTopicComment };
