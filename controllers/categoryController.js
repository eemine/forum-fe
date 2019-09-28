import * as CategoryModel from '../models/CategoryModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('categoryController');

const getCategoryByUrlId = async (req, res) => {
  logger.log('debug', 'getCategoryByUrlId: %j', req.params);
  const category = await CategoryModel.getCategoryByUrlId(req.params.urlId);
  res.status(200).send({ payload: { category } });
};

const getCategories = async (req, res) => {
  logger.log('debug', 'getCategories: %j', req.params);
  const categories = await CategoryModel.getCategories();
  res.status(200).send({ payload: { categories } });
};

const addCategory = async (req, res) => {
  logger.log('debug', 'addCategory: %j', req.body);
  await CategoryModel.save({
    name: req.body.name,
    description: req.body.description,
    imagePath: req.body.imagePath,
    urlId: req.body.urlId,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  res.status(201).send();
};

export { getCategories, addCategory, getCategoryByUrlId };
