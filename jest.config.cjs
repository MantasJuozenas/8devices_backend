module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!chai).+\\.js$', // Include 'chai' for transformation
  ],
  testEnvironment: 'node',
};
