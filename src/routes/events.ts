import e from "express";
import { verifyTeacher, verifyUser } from "../middlewares/auth";
import { Event } from "../models/event";
const eventsRouter = e.Router();

eventsRouter.post("/", verifyUser, verifyTeacher, async (req, res) => {
  const event = await new Event(req.body).save();
  res.send(event);
});

export default eventsRouter;
