import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    userId: { type: String, trim: true, required: true },
    categoryId: { type: String, trim: true, required: true },
  },
  { timestamps: true },
);

const TopicModel = mongoose.model('Topic', topicSchema);

const save = async model => new TopicModel(model).save();

const getTopics =  async () => TopicModel.find();

const getTopicById = async (topicId) => TopicModel.findOne({_id: topicId});

export { topicSchema, save, getTopics, getTopicById };
