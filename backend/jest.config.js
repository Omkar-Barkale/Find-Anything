export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/tests/**/*.test.[jt]s', '**/?(*.)+(spec|test).[jt]s'],
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  testTimeout: 20000,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/uploads/']
};
