import * as TopicModel from '../models/TopicModel';

const logger = require('../utils/logger')('topicController');

const addTopic = async (req, res) => {
  logger.log('info', 'addTopic: %j', req.body);
  const { user } = req;
  const topic = await TopicModel.save({
    title: req.body.title,
    userId: user._id,
    categoryId: req.body.categoryId,
  });
  res.status(200).send({ payload: topic });
};

const getTopicsByCategoryId = async (req, res) => {
  logger.log('info', 'getTopicsByCategoryId: %j', req.params);
  const topics = await TopicModel.getTopicsByCategoryId(req.params.categoryId);
  res.status(200).send({ payload: topics || [] });
};

const getTopicById = async (req, res) => {
  logger.log('info', 'getTopicById: %j', req.params);
  const topic = await TopicModel.getTopicById(req.params.topicId);
  res.status(200).send({ payload: topic });
};

export { addTopic, getTopicsByCategoryId, getTopicById };
