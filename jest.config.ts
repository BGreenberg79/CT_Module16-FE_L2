import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', 
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', 
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'], 
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['/node_modules/(?!@testing-library)'],
};

export default config;
