module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/test/__mocks__/fileMock.js',
    },
  };