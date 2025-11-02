const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["./jest.setup.env.js"],
  testTimeout: 60000,
};

module.exports = createJestConfig(config);
