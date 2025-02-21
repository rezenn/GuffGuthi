module.exports = {
  testEnvironment: 'jsdom', // Ensure jsdom is used for React testing
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Add global setup file for testing
  transform: {
    "^.+\\.jsx?$": "babel-jest", 
     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      "^.+\\.(svg|png|jpg|jpeg|gif)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock CSS imports with identity-obj-proxy
  },
  moduleFileExtensions: ["js", "jsx"], 
  transformIgnorePatterns: [
    '/node_modules/(?!quill)/', // Allow quill to be transformed
  ],
};
