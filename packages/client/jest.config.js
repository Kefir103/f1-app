const nextJest = require('next/jest');

const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    rootDir: '.',
    testRegex: '/__tests__/unit/.*\\.(spec|test)\\.(j|t)s(x)?$',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(t|j)s(x)?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    modulePathIgnorePatterns: ['node_modules', '.next', 'mocks'],
    coveragePathIgnorePatterns: ['node_modules', '.next', 'mocks'],
    collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s(x)?'],
    testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
