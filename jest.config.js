module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/domain/models/**',
    '!<rootDir>/src/domain/ports/**',
    '!<rootDir>/src/main/**'
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
