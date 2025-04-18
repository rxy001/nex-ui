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
    '!**/.storybook',
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
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    languageOptions: {
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
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            './tsconfig.json',
            './docs/tsconfig.json',
            './storybook/tsconfig.json',
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
        },
        node: true,
      },
      react: {
        version: 'detect',
      },
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

      'no-sparse-arrays': 'off',
      'no-nested-ternary': 'off',
      'no-underscore-dangle': 'off',

      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
        },
      ],

      'no-use-before-define': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',

      'react/no-unknown-property': [
        'error',
        {
          ignore: ['css'],
        },
      ],

      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx', '.jsx'],
        },
      ],

      'react/button-has-type': 'off',
      'react/function-component-definition': 'off',
      'no-restricted-syntax': 'off',
      'consistent-return': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: false,
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
    },
  },

  eslintPluginPrettierRecommended,
)

// export default defineConfig([
// globalIgnores([
//   '*/.next/*',
//   '**/*.css',
//   '**/dist',
//   'public/*',
//   '!**/.storybook',
//   '**/node_modules',
//   '**/assets',
//   '**/notes',
//   '**/coverage',
//   '**/.husky',
//   '**/*.yaml',
//   '**/build',
//   '**/.turbo',
// ]),
//   {
// extends: fixupConfigRules(
//   compat.extends(
//     'airbnb',
//     'airbnb/hooks',
//     'plugin:import/typescript',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ),
// ),
//     plugins: {
//       '@typescript-eslint': fixupPluginRules(typescriptEslint),
//       prettier: fixupPluginRules(prettier),
//     },
//     languageOptions: {
// globals: {
//   ...globals.node,
//   ...globals.browser,
//   ...globals.jest,
// },
//       parser: tsParser,
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//         project: true,
//       },
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//       'import/resolver': {
//         typescript: {
//           project: [
//             './tsconfig.json',
//             './storybook/tsconfig.json',
//             './docs/tsconfig.json',
//             './packages/**/tsconfig.json',
//           ],
//           conditionNames: [
//             'types',
//             'source',
//             'import',
//             'require',
//             'node',
//             'browser',
//             'default',
//           ],
//         },
//       },
//     },
// rules: {
//   'no-console': [
//     'warn',
//     {
//       allow: ['error', 'warn'],
//     },
//   ],

//   'no-sparse-arrays': 'off',
//   'no-nested-ternary': 'off',
//   'no-underscore-dangle': 'off',

//   '@typescript-eslint/no-use-before-define': [
//     'error',
//     {
//       functions: false,
//       classes: true,
//       variables: true,
//     },
//   ],

//   'no-use-before-define': 'off',
//   'react/prop-types': 'off',
//   'react/require-default-props': 'off',
//   'react/react-in-jsx-scope': 'off',
//   'react/jsx-props-no-spreading': 'off',

//   'react/no-unknown-property': [
//     'error',
//     {
//       ignore: ['css'],
//     },
//   ],

//   'react/jsx-filename-extension': [
//     'error',
//     {
//       extensions: ['.tsx', '.jsx'],
//     },
//   ],

//   'react/button-has-type': 'off',
//   'react/function-component-definition': 'off',
//   'no-restricted-syntax': 'off',
//   'consistent-return': 'off',
//   'import/extensions': 'off',
//   'import/no-extraneous-dependencies': 'off',
//   'import/prefer-default-export': 'off',
//   'jsx-a11y/control-has-associated-label': 'off',
//   'jsx-a11y/anchor-is-valid': 'off',
//   'jsx-a11y/click-events-have-key-events': 'off',
//   'jsx-a11y/no-static-element-interactions': 'off',
//   'jsx-a11y/label-has-associated-control': 'off',
//   '@typescript-eslint/no-explicit-any': 'off',
//   '@typescript-eslint/ban-ts-comment': 'off',

//   '@typescript-eslint/consistent-type-imports': [
//     'error',
//     {
//       prefer: 'type-imports',
//       fixStyle: 'separate-type-imports',
//     },
//   ],

//   '@typescript-eslint/consistent-type-exports': [
//     'error',
//     {
//       fixMixedExportsWithInlineTypeSpecifier: false,
//     },
//   ],

//   '@typescript-eslint/no-unused-vars': [
//     'error',
//     {
//       argsIgnorePattern: '^_',
//       varsIgnorePattern: '^_',
//       caughtErrorsIgnorePattern: '^_',
//     },
//   ],
//   '@typescript-eslint/no-empty-object-type': 'off',
//   '@typescript-eslint/no-unsafe-function-type': 'off',
// },
//   },
//   {
//     files: ['./**/*.js'],
//     extends: fixupConfigRules(
//       compat.extends('plugin:@typescript-eslint/disable-type-checked'),
//     ),
//   },
//   {
//     files: ['__tests__/**/*'],
//     plugins: {
//       jest,
//     },
//     languageOptions: {
//       globals: {
//         ...jest.environments.globals.globals,
//       },
//     },
//   },
// ])
