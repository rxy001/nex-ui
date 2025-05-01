import { defineConfig } from 'eslint/config'
import config from '../eslint.config.mjs'

export default defineConfig([
  {
    extends: [config],
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react/require-default-props': 'off',
    },
  },
])
