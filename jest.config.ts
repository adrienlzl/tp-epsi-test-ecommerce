export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    setupFiles: ['<rootDir>/jest.setup.ts'],
    collectCoverage: true,
    coverageProvider: 'v8',
    collectCoverageFrom: [
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}'
    ],
    coverageDirectory: 'coverage'
};
