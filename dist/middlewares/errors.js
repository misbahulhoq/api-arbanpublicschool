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
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidatorMiddleware = void 0;
const envValidator_1 = require("../utils/envValidator");
const winston_1 = __importStar(require("winston"));
const { combine, timestamp, json } = winston_1.default.format;
const requiredEnv = [
    "jwtPrivateKey",
    "dbUserName",
    "dbPass",
    "email_address",
    "email_pass",
    "info_email",
    "contact_email",
    "contact_email_app_pass",
];
const logger = (0, winston_1.createLogger)({
    level: "error",
    format: combine(timestamp(), json()),
    transports: [
        new winston_1.default.transports.File({ filename: "errors.log", level: "error" }),
        new winston_1.default.transports.Console(),
    ],
});
const envValidatorMiddleware = (req, res, next) => {
    try {
        (0, envValidator_1.envValidator)(requiredEnv);
        next();
    }
    catch (ex) {
        next(ex);
    }
};
exports.envValidatorMiddleware = envValidatorMiddleware;
const globalErrorHandler = (err, req, res, next) => {
    logger.error(err.message);
};
exports.default = globalErrorHandler;
