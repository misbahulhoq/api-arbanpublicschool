import e from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import { Event } from "../models/event";
const eventsRouter = e.Router();

eventsRouter.post("/", verifyUser, verifyTeacher, async (req, res) => {
  const event = await new Event(req.body).save();
  res.send(event);
});

eventsRouter.get("/", async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

eventsRouter.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).send({ message: "Event not found" });
  res.send(event);
});

eventsRouter.delete(
  "/:id",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req, res) => {
    const foundEvent = await Event.findById(req.params.id);
    if (!foundEvent) return res.status(404).send({ message: "No event found" });
    const deleted = await Event.findByIdAndDelete(req.params.id);
    res.send(deleted);
  }
);

export default eventsRouter;
