import { defineConfig } from 'eslint/config'
import config from '../eslint.config.mjs'

export default defineConfig([
  {
    extends: [config],
  },
])
