import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8000;

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
