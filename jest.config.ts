import { pathsToModuleNameMapper } from 'ts-jest'
import type { JestConfigWithTsJest } from 'ts-jest'
import { compilerOptions } from './tsconfig.test.json'

// jest 默认为 cjs，通过 NODE_OPTIONS=--experimental-vm-modules jest 开启 esm , 同时 transformer 输出为 esm
// 如果 jest 未开启 esm， jest-ts 编译后还是 cjs
// 可通过 jest 缓存目录查看编译过的代码. jest --showConfig cacheDirstory 查看缓存目录.
// 查看编译结果时先清缓存 jest --clearCache
const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
      },
    ],
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  extensionsToTreatAsEsm: ['.ts'],
  // collectCoverage: true,
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['__stories__/', 'dist/'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  watchman: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  injectGlobals: false,
}

export default jestConfig
