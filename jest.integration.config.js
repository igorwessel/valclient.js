/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig-test.json",
        },
    },
    testEnvironment: "node",
    coverageReporters: ["json-summary"],
    setupFiles: ["dotenv/config"],
    setupFilesAfterEnv: ["./__tests__/__setup__/integration.ts", "./__tests__/__setup__/jest-extended.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/__setup__/"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src" }),
};
