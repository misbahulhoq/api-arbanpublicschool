/** @type {import('ts-jest').JestConfigWithTsJest} **/
const env = process.env.NODE_ENV;
module.exports = {
  testEnvironment: "node",
  maxConcurrency: 1,
  coverageProvider: "v8",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+.tsx?$": env === "test" ? "ts-jest" : ["ts-jest", {}],
  },
  testMatch: [env === "test" ? "**/*.test.ts" : "**/*.test.js"],
  rootDir: env === "test" ? "./src" : "./dist",
};
