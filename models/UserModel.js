import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    hashPassword: { type: String, unique: true, required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    imagePath: { type: String },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', userSchema);

const save = async model => new UserModel(model).save();

const getUserByUsername = async username => UserModel.findOne({ username });

const getUserByEmail = async email => UserModel.findOne({ email });

UserModel.schema
  .path('username')
  .validate(async username => !(await getUserByUsername(username)), 'User already exists!');

UserModel.schema
  .path('email')
  .validate(async email => !(await getUserByEmail(email)), 'User already exists!');

export { userSchema, save };
