import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import jest from 'eslint-plugin-jest'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { globalIgnores } from 'eslint/config'

export default tseslint.config(
  globalIgnores([
    '*/.next/*',
    '**/*.css',
    '**/dist',
    'public/*',
    '**/node_modules',
    '**/assets',
    '**/notes',
    '**/coverage',
    '**/.husky',
    '**/*.yaml',
    '**/build',
    '**/.turbo',
  ]),
  eslint.configs.recommended,
  // jsxA11y.flatConfigs.recommended,
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
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.node,
        ...globals.serviceworker,
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            './tsconfig.json',
            './docs/tsconfig.json',
            './packages/**/tsconfig.json',
          ],
          conditionNames: [
            'types',
            'source',
            'import',
            'require',
            'node',
            'browser',
            'default',
          ],
          noWarnOnMultipleProjects: true,
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ... any rules you want
      'jsx-a11y/alt-text': 'error',
    },
  },
  {
    files: ['__tests__/**/*.test.{tsx|jsx|js|ts}'],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
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

      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'import/no-named-as-default': 'off',

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
    },
  },
)
