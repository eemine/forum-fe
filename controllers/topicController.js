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

const getTopics = async (req, res) => {
  logger.log('info', 'getTopics: %j', req.body);
  const topics = await TopicModel.getTopics();
  res.status(200).send({ payload: topics || [] });
};

const getTopicById = async (req, res) => {
  logger.log('info', 'getTopicById: %j', req.body);
  const topic = await TopicModel.getTopicById(req.params.topicId);
  res.status(200).send({ payload: topic });
};

export { addTopic, getTopics, getTopicById }
