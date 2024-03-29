module.exports = {
  transform: {
    '.*.ts': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  rootDir: '',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coveragePathIgnorePatterns: ['node_modules', 'examples', 'dist', 'test'],
  testTimeout: 180000,
  testPathIgnorePatterns: ['__tests__/fixtures', 'build'],
  verbose: true,
  maxConcurrency: 1,
};
