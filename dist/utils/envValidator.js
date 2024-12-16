"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidator = void 0;
const envValidator = (env) => {
    const missingVars = env.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
        throw new Error(`Missing environment variables ${missingVars.join(", ")}`);
    }
};
exports.envValidator = envValidator;
