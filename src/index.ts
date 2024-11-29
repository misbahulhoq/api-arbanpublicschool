import express, { Request, Response } from "express";
import { dbConnect } from "./startup/db";
import routes from "./startup/routes";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

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
