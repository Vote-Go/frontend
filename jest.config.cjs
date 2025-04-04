module.exports = {
  setupFiles: ["./setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
