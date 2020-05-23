// Add .env variables to the application
require('dotenv').config();

module.exports = {
  moduleFileExtensions: ['js', 'json'],
  roots: ['__tests__', './src'],
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./__tests__/setup.js']
};
