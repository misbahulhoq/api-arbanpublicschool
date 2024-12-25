import Joi from "joi";
import mongoose, { Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

interface IUser {
  uid?: string;
  email: string;
  phone: string;
  password?: string;
  role: string;
  isAdmin?: boolean;
}

interface IUserMethods {
  generateAuthToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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
  phone: {
    type: String,
    required: true,
    minlength: 11,
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
      uid: this.uid,
      email: this.email,
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
  uid: string;
  email: string;
  phone: string;
  password?: string;
  role: string;
  isAdmin?: boolean;
};

function validateUser(user: User) {
  const schema = Joi.object({
    uid: Joi.string().min(6).max(6).required(),
    email: Joi.string().min(8).max(50).required(),
    phone: Joi.string().min(11).max(15).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().min(6).max(20).required(),
    isAdmin: Joi.boolean().optional(),
  });

  return schema.validate(user);
}

export { User, validateUser };
