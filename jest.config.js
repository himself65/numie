module.exports = {
  verbose: false,
  roots: [
    '<rootDir>/src',
    '<rootDir>/test/unit'
  ],
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['src/**/*.{js}'],
  transformIgnorePatterns: ['node_modules']
}
