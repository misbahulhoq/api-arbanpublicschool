import Joi from "joi";
import { Schema, Document, model } from "mongoose";

// Utility function to format the date as "dd/mm/yy"
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
  return `${day}/${month}/${year}`;
}

// Define the TypeScript interface for the Notice
export interface INotice extends Document {
  title: string;
  description: string;
  publishDate: string; // The formatted date as a string
  isActive: boolean;
  resourceUrl?: string;
}

// Create the Mongoose schema for the Notice
const NoticeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  resourceUrl: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now,
    get: (value: Date) => formatDate(value), // Apply the formatting function
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Enable getters when using `toObject()` or `toJSON()`
NoticeSchema.set("toJSON", { getters: true });
NoticeSchema.set("toObject", { getters: true });

export function validateNotice(data: INotice) {
  const schema = Joi.object({
    title: Joi.string().required().min(10),
    description: Joi.string().required().min(25),
    resourceUrl: Joi.string().optional().allow(""),
  });
  return schema.validate(data);
}
// Create and export the model
export const Notice = model<INotice>("Notice", NoticeSchema);
