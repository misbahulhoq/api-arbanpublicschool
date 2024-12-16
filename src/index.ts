import express, { Request, Response } from "express";
import "express-async-errors";
import { dbConnect } from "./startup/db";
import routes from "./startup/routes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler, {
  envValidatorMiddleware,
} from "./middlewares/errors";

const app = express();
const port = process.env.PORT || 8000;
let origin;

if (process.env.NODE_ENV === "development")
  origin = ["http://localhost:3000", "http://192.168.31.27:3000"];
else origin = ["https://arbanpublicschool.vercel.app"];

// middlewares
app.use(express.json());
app.use(envValidatorMiddleware);
app.use(
  cors({
    origin: origin,
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
// global error handling middleware
app.use(globalErrorHandler);

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

console.log("something");

let server = app.listen(port, () => {
  console.log("server is running at http://localhost:" + port);
});

export default app;

export { server };
