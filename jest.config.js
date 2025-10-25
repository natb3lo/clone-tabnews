const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["./jest.setup.env.js"],
};

module.exports = createJestConfig(config);
