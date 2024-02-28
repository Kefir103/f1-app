const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    rootDir: '.',
    testRegex: '.*\\.(spec|test)\\.(j|t)s(x)?$',
    transform: {
        '^.+\\.(t|j)s(x)?$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    modulePathIgnorePatterns: ['node_modules', '.next'],
    collectCoverageFrom: ['**/*.(t|j)s'],
    testEnvironment: 'node',
};
