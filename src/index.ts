import express, { Request, Response } from "express";
import { dbConnect } from "./startup/db";
import routes from "./startup/routes";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
dotenv.config();

// startup
dbConnect();
routes(app);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: "success",
    code: "200",
    message: "Request processed successfully",
    data: {},
  });
});

app.listen(port, () => {
  console.log("server is running at http://localhost:" + port);
});
