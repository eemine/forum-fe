import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    hashPassword: { type: String, unique: true, required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    gender: { type: String, trim: true, required: true },
    imagePath: { type: String },
  },
  { timestamps: true },
);

userSchema.pre('save', async function callback(next) {
  if (this.hashPassword) {
    this.hashPassword = await bcrypt.hash(
      this.hashPassword,
      parseInt(process.env.PASSWORD_HASHING_ROUNDS, 10),
    );
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

const save = async model => new UserModel(model).save();

const getUserByUsername = async username => UserModel.findOne({ username });

const getUserByEmail = async email => UserModel.findOne({ email });

const comparePassword = async ({ password, hashPassword }) =>
  bcrypt.compare(password, hashPassword);

UserModel.schema
  .path('username')
  .validate(async username => !(await getUserByUsername(username)), 'User already exists!');

UserModel.schema
  .path('email')
  .validate(async email => !(await getUserByEmail(email)), 'User already exists!');

export { userSchema, save, getUserByUsername, comparePassword };
