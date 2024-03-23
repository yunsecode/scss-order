module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/src/tests/**/*.(test|spec).(ts|tsx)'
    ],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
