import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  images: string[]; // Array of image URLs
}

const EventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    images: {
      type: [String], // Array of strings (image URLs)
      required: [true, "At least one image is required"],
      validate: {
        validator: (images: string[]) => images.length > 0,
        message: "At least one image is required",
      },
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

export const Event = mongoose.model<IEvent>("Event", EventSchema);
