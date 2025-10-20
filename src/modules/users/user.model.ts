import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import z from "zod";

export const userZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["admin", "teacher", "student"]).default("student"),
});

export type TUser = z.infer<typeof userZodSchema>;

export interface IUser extends Document, TUser {}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    enum: ["admin", "teacher"],
    default: "student",
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
