import eslint from '@eslint/js'
import globals from 'globals'
import jest from 'eslint-plugin-jest'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import * as reactHooks from 'eslint-plugin-react-hooks'
import * as tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/.next',
      '**/*.css',
      '**/dist',
      '**/public',
      '**/node_modules',
      '**/assets',
      '**/notes',
      'coverage/*',
      '.husky/*',
      '**/*.yaml',
      '**/build',
      '**/.turbo',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs['recommended-latest'],
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    rules: {
      'import/no-duplicates': ['error', { considerQueryString: true }],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.serviceworker,
        ...globals.browser,
      },
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            'tsconfig.json',
            'docs/tsconfig.json',
            'sb/tsconfig.json',
            'packages/*/tsconfig.json',
          ],
          conditionNames: [
            'source',
            'types',
            'import',
            'require',
            'node',
            'browser',
            'default',
          ],
          noWarnOnMultipleProjects: true,
        },
      },
    },
  },
  {
    files: ['__tests__/**/*.test.{tsx|jsx|js|ts}'],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    ...jest.configs['flat/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    rules: {
      'no-console': [
        'warn',
        {
          allow: ['error', 'warn'],
        },
      ],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx', '.jsx'],
        },
      ],
      'react/prop-types': 'off',

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      'jsx-a11y/alt-text': 'error',
    },
  },
)
