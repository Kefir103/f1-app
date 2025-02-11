const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    collectCoverageFrom: ['**/*.(t|j)s', '!<rootDir>/*.(t|j)s'],
    coveragePathIgnorePatterns: ['node_modules', 'e2e', 'dist'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
};
