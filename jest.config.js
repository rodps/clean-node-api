module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@mocks/(.*)': '<rootDir>/tests/mocks/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['@relmify/jest-fp-ts']
}
