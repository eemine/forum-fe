import * as CategoryModel from '../models/CategoryModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('categoryController');

const getCategoryById = async (req, res) => {
  logger.log('debug', 'getCategory: %j', req.body);
  const category = await CategoryModel.getCategoryById(req.params.categoryId);
  res.status(200).send({ payload: { category } });
};

const getCategories = async (req, res) => {
  logger.log('debug', 'getCategories: %j', req.body);
  const categories = await CategoryModel.getCategories();
  res.status(200).send({ payload: { categories } });
};

const addCategory = async (req, res) => {
  logger.log('debug', 'addCategory: %j', req.body);
  await CategoryModel.save({
    name: req.body.name,
    description: req.body.description,
    imagePath: req.params.imagePath,
    urlId: req.params.urlId,

  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  res.status(201).send();
};

export { getCategoryById, getCategories, addCategory };
