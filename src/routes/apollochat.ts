import e from "express";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/chat";
import { data } from "../data/data";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const apollochat = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const appollochatRouter = e.Router();

appollochatRouter.post("/", async (req, res) => {
  const { prompt } = req.body;
  const fullPrompt = `${data}\n\nUser: ${prompt}`;
  try {
    const result = await apollochat.generateContent(fullPrompt);
    const response = result.response.text();
    const chat = await new Chat({ prompt, response }).save();
    res.send(chat);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default appollochatRouter;
