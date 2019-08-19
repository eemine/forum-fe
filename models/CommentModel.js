import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, trim: true, required: true },
    text: { type: String, trim: true, required: true },
    topicId: { type: String, required: true },
  },
  { timestamps: true },
);

const CommentModel = mongoose.model('Comment', commentSchema);

const save = async model => new CommentModel(model).save();

const getCommentsByTopicId = async mediaId => CommentModel.find({ mediaId });

export { commentSchema, getCommentsByTopicId, save };
