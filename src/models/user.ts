import Joi from "joi";
import mongoose, { Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

interface IUser {
  name: string;
  uid?: string;
  email: string;
  password: string;
  role: string;
  isAdmin?: boolean;
}

interface IUserMethods {
  generateAuthToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  // stands for user id
  uid: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    default: "student",
    minlength: 6,
    maxlength: 20,
  },
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      role: this.role,
    },
    process.env.jwtPrivateKey as string,
    { expiresIn: "7d" }
  );

  return token;
};

const User = mongoose.model<IUser, UserModel>("user", userSchema);

type User = {
  name: String;
  uid: String;
  email: String;
  password: String;
  role: String;
  isAdmin?: Boolean;
};

function validateUser(user: User) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    uid: Joi.string().min(6).max(6),
    email: Joi.string().min(8).max(50).required(),
    password: Joi.string().min(6),
    role: Joi.string().min(6).max(20).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

export { User, validateUser };
