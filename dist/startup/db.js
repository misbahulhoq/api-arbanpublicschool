"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = dbConnect;
const mongoose_1 = __importDefault(require("mongoose"));
const db = process.env.NODE_ENV === "test" ? "arban-test" : "arban";
function dbConnect() {
    mongoose_1.default
        .connect(`mongodb+srv://${process.env.dbUserName}:${process.env.dbPass}@cluster0.5dbzkti.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() => {
        console.log(`connected to ${db} database..`);
    });
}
