"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const db_1 = require("./startup/db");
const routes_1 = __importDefault(require("./startup/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errors_1 = __importStar(require("./middlewares/errors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
let origin;
if (process.env.NODE_ENV === "development")
    origin = ["http://localhost:3000", "http://192.168.31.27:3000"];
else
    origin = ["https://arbanpublicschool.vercel.app"];
// middlewares
app.use(express_1.default.json());
app.use(errors_1.envValidatorMiddleware);
app.use((0, cors_1.default)({
    origin: origin,
    credentials: true,
    allowedHeaders: ["Authorization", "authToken", "Content-Type", "authtoken"],
    exposedHeaders: ["authToken"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
}));
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
// startup
(0, db_1.dbConnect)();
(0, routes_1.default)(app);
// global error handling middleware
app.use(errors_1.default);
const basicResponse = {
    status: "success",
    code: 200,
    message: "Request processed successfully",
    devInfo: {
        name: "Md Mezbah Uddin",
        portfolio: "https://misbahulhoq.vercel.app/",
    },
};
app.get("/", (req, res) => {
    res.send(basicResponse);
});
let server = app.listen(port, () => {
    console.log("server is running at http://localhost:" + port);
});
exports.default = server;
