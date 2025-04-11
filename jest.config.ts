// jest 默认为 cjs，通过 NODE_OPTIONS=--experimental-vm-modules jest 开启 esm , 同时 transformer 输出为 esm
// 如果 jest 未开启 esm， jest-ts 编译后还是 cjs
// 可通过 jest 缓存目录查看编译过的代码. jest --showConfig cacheDirstory 查看缓存目录.
// 查看编译结果时先清缓存 jest --clearCache

const jestConfig = {
  verbose: true,
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^@nex-ui/styled$': '<rootDir>/./packages/styled/src',
    '^@nex-ui/utils$': '<rootDir>/./packages/utils/src',
    '^@nex-ui/system$': '<rootDir>/./packages/system/src',
    '^@nex-ui/icons$': '<rootDir>/./packages/icons/src',
    '^@nex-ui/react$': '<rootDir>/./packages/react/src',
    '^@nex-ui/hooks$': '<rootDir>/./packages/hooks/src',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { tsx: true, syntax: 'typescript' },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // collectCoverage: true,
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['__stories__/', 'dist/'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  watchman: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
}

export default jestConfig
