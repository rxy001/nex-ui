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
      '**/bin/*.js',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs['recommended-latest'],
  {
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
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
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    rules: {
      'no-console': [
        'warn',
        {
          allow: ['error', 'warn'],
        },
      ],

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

      'react/void-dom-elements-no-children': 'error',
      'react/jsx-pascal-case': 'error',
      'react/forbid-prop-types': 'error',
      'react/prop-types': 'off',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx', '.jsx'],
        },
      ],
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'import/no-cycle': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/prefer-default-export': 'off',
      'import/no-named-as-default': 'off',
      'import/newline-after-import': 'error',
      'import/first': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
            'type',
          ],
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  {
    files: ['packages/react/**/*.{ts,tsx,js,jsx}'],
    ignores: ['**/*.stories.tsx', '**/*.test.tsx'],
    rules: {
      'react/display-name': ['error', { ignoreTranspilerName: true }],
    },
  },
  {
    files: ['__tests__/**/*.test.{tsx,jsx,js,ts}'],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    ...jest.configs['flat/recommended'],
  },
  {
    files: ['./scripts/**/*.{ts,js}'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.d.ts', '**/*.d.cts'],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
  },
  eslintPluginPrettierRecommended,
)
