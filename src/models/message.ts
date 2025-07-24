import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * @interface IMessage
 * @description Defines the structure for a message document, ensuring type
 * safety for message objects.
 */
export interface IMessage extends Document {
  conversationId: mongoose.Schema.Types.ObjectId;
  role: "user" | "model";
  content: string;
}

/**
 * @const MessageSchema
 * @description The Mongoose schema that maps the IMessage interface to the
 * 'messages' collection in MongoDB.
 */
const MessageSchema: Schema = new Schema(
  {
    /**
     * @property {ObjectId} conversationId - A required reference to the
     * Conversation model. This is the crucial link that groups messages
     * into a single chat. An index is added for fast retrieval of all
     * messages in a conversation.
     */
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    /**
     * @property {'user' | 'model'} role - Defines who sent the message.
     * 'user' for prompts from the frontend and 'model' for responses
     * from the Gemini API.
     */
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },

    /**
     * @property {string} content - The actual text content of the message,
     * whether it's the user's prompt or the AI's response.
     */
    content: {
      type: String,
      required: true,
    },
  },
  {
    /**
     * @property {boolean} timestamps - Automatically adds `createdAt` and
     * `updatedAt` fields. `createdAt` is essential for sorting messages
     * chronologically.
     */
    timestamps: true,
  }
);

/**
 * @const Message
 * @description The Mongoose model for messages. This logic prevents
 * model recompilation issues during hot-reloading in Next.js development.
 */
const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
