"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const event_1 = require("../models/event");
const eventsRouter = express_1.default.Router();
eventsRouter.post("/", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield new event_1.Event(req.body).save();
    res.send(event);
}));
eventsRouter.put("/:id", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundEvent = yield event_1.Event.findById(req.params.id);
    if (!foundEvent)
        return res.status(404).send({ message: "No event found" });
    const updated = yield event_1.Event.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: "after",
    });
    res.send(updated);
}));
eventsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_1.Event.find();
    res.send(events);
}));
eventsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_1.Event.findById(req.params.id);
    if (!event)
        return res.status(404).send({ message: "Event not found" });
    res.send(event);
}));
eventsRouter.delete("/:id", auth_1.verifyUser, auth_1.verifyTeacher, auth_1.verifyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundEvent = yield event_1.Event.findById(req.params.id);
    if (!foundEvent)
        return res.status(404).send({ message: "No event found" });
    const deleted = yield event_1.Event.findByIdAndDelete(req.params.id);
    res.send(deleted);
}));
exports.default = eventsRouter;
