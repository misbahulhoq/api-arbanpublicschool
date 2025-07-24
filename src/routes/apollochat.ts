import e, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload } from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/chat";
import { data } from "../data/data";
import Conversation from "../models/conversation";
import Message from "../models/message";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const appollochatRouter = e.Router();

// Helper to get user ID from the request token
const getUserIdFromRequest = (req: Request) => {
  const token = req.header("authToken");
  if (!token) return null;
  try {
    const decoded = jwt.verify(
      token,
      process.env.jwtPrivateKeyq as string
    ) as JwtPayload;
    return decoded._id;
  } catch (error) {
    return null;
  }
};
// appollochatRouter.post("/", async (req, res) => {
//   const { prompt } = req.body;
//   const fullPrompt = `${data}\n\nUser: ${prompt}`;
//   try {
//     const result = await apollochat.generateContent(fullPrompt);
//     // res.send(result);
//     const response = result.response.text();
//     // The regex with the global 'g' flag to find all matches
//     const titleRegex = /Title: (.+?) - End of Title\./g;
//     const titleRemovalRegex = /Title: (.+?) - End of Title\.\n/g;
//     const contentOnly = response.replace(titleRemovalRegex, "").trim();

//     // Use matchAll to get an iterator of all matches
//     const matches = response.matchAll(titleRegex);

//     // Convert the iterator to an array and extract the first capturing group from each match
//     const titles = Array.from(matches, (match) => match[1].trim());
//     const chat = await new Chat({ prompt, response: contentOnly }).save();
//     res.send({ chat, titles });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

appollochatRouter.post("/", async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const finalPrompt = `
    Please use the following custom information to answer the user's question. If the information is not relevant, feel free to use your general knowledge.
    [CUSTOM INFORMATION]
    ${data}\n\n
    [END OF CUSTOM INFORMATION]
    User's question: ${prompt}`;
    const loggedInUserId = getUserIdFromRequest(req);

    // --- Logic for an Existing Chat ---
    if (conversationId) {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).send({ error: "Conversation not found" });
      }

      // Authorization: Check if the conversation belongs to the logged-in user
      if (
        conversation.userId &&
        conversation.userId.toString() !== loggedInUserId
      ) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      // Fetch message history to provide context to the AI
      const messages = await Message.find({ conversationId }).sort({
        createdAt: "asc",
      });
      const history = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      // Start the chat with context and get the new response
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(finalPrompt);
      const text = result.response.text();

      // Save the new messages
      await Message.create({ conversationId, role: "user", content: prompt });
      const modelMessage = await Message.create({
        conversationId,
        role: "model",
        content: text,
      });

      return res.status(200).json({ modelResponse: modelMessage });
    }

    // --- Logic for a New Chat ---
    else {
      // 1. Create a new conversation, linking the user if they are logged in
      const newConversation = await Conversation.create({
        userId: loggedInUserId, // This will be null for anonymous users
      });

      // 2. Save the user's first message
      await Message.create({
        conversationId: newConversation._id,
        role: "user",
        content: prompt,
      });

      // 3. Get the main chat response from Gemini
      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(finalPrompt);
      const text = result.response.text();

      // 4. Save the model's first response
      const modelMessage = await Message.create({
        conversationId: newConversation._id,
        role: "model",
        content: text,
      });

      // 5. Generate a title for the conversation using a second AI call
      const titlePrompt = `Generate a short, concise title for a conversation starting with this prompt: "${prompt}" Give me just one clear and concise title, not multiple titles.`;
      const titleResult = await model.generateContent(titlePrompt);
      const generatedTitle = titleResult.response.text().replace(/"/g, ""); // Clean up quotes

      // 6. Update the conversation with the new title
      newConversation.title = generatedTitle;
      await newConversation.save();

      // 7. Send the complete response back to the client
      return res.status(201).json({
        modelResponse: modelMessage,
        conversationId: newConversation._id,
        title: newConversation.title,
      });
    }
  } catch (error) {
    console.error("Chat route error:", error);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
});

export default appollochatRouter;
