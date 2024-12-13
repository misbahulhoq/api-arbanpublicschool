/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: "node",
  maxConcurrency: 1,
  coverageProvider: "v8",
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"],
  rootDir: "./src",
};
