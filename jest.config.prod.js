/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: "node",
  maxConcurrency: 1,
  coverageProvider: "v8",
  moduleFileExtensions: ["js"], // Test only the built JavaScript files
  testMatch: ["<rootDir>/dist/**/*.test.js"], // Match test files in the 'dist' directory
  rootDir: "./", // Set the root directory
  testPathIgnorePatterns: ["/node_modules/"], // Ignore node_modules
};
