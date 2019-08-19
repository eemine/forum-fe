import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    imagePath:  { type: String },
    urlId: { type: String, trim: true, unique: true }
  },
  { timestamps: true },
);

const CategoryModel = mongoose.model('Category', categorySchema);

const getCategoryByUrlId = async urlId => CategoryModel.findOne({ urlId });

const save = async model => new CategoryModel(model).save();

const getCategories =  async () => CategoryModel.find();

const getCategoryById = async (topicId) => CategoryModel.findOne({_id: topicId});

CategoryModel.schema
  .path('urlId')
  .validate(async urlId => !(await getCategoryByUrlId(urlId)), 'UrlId already exists!');

export { categorySchema, getCategoryByUrlId, save, getCategoryById, getCategories };
