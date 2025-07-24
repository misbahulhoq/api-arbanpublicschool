import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * @interface IConversation
 * @description Defines the structure for a conversation document in MongoDB,
 * providing type safety for our application.
 */
export interface IConversation extends Document {
  userId?: mongoose.Schema.Types.ObjectId;
  title: string;
}

/**
 * @const ConversationSchema
 * @description The Mongoose schema that maps the IConversation interface to a
 * MongoDB collection.
 */
const ConversationSchema: Schema = new Schema(
  {
    /**
     * @property {ObjectId} userId - An optional reference to the User model.
     * This links a conversation to a specific user. It's nullable to allow
     * for anonymous (non-logged-in) user chats.
     */
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /**
     * @property {string} title - The title of the conversation.
     * This is generated automatically after the first message and displayed
     * in the user's chat history.
     */
    title: {
      type: String,
      required: true,
      trim: true,
      default: "New Chat",
    },
  },
  {
    /**
     * @property {boolean} timestamps - Automatically adds `createdAt` and
     * `updatedAt` fields to the document. The `updatedAt` field is
     * particularly useful for sorting conversations by recent activity.
     */
    timestamps: true,
  }
);

/**
 * @const Conversation
 * @description The Mongoose model for conversations. It prevents recompilation
 * of the model during Next.js hot-reloading in development.
 */
const Conversation: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
