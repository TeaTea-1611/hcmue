/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testPathIgnorePatterns: [".js"],
  globals: {
    // when we are testing we want to use a slightly different config
    // to allow for jest types
    "ts-jest": {
      tsconfig: "<rootDir>/src/__tests__/tsconfig.json",
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
