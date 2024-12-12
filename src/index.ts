import express, { Request, Response } from "express";
import { dbConnect } from "./startup/db";
import routes from "./startup/routes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.31.27:3000"],
    // origin: "*",
    credentials: true,
    allowedHeaders: ["Authorization", "authToken", "Content-Type", "authtoken"],
    exposedHeaders: ["authToken"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());
dotenv.config();

// startup
dbConnect();
routes(app);

const basicResponse = {
  status: "success",
  code: 200,
  message: "Request processed successfully",
  devInfo: {
    name: "Md Mezbah Uddin",
    portfolio: "https://misbahulhoq.vercel.app/",
  },
};
app.get("/", (req: Request, res: Response) => {
  res.send(basicResponse);
});

let server = app.listen(port, () => {
  console.log("server is running at http://localhost:" + port);
});

export default server;
