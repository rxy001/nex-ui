import { defineConfig } from '@nex-ui/system'
import {
  scales,
  aliases,
  breakpoints,
  tokens,
  semanticTokens,
  selectors,
} from './system'

export const defaultConfig = defineConfig({
  aliases,
  scales,
  breakpoints,
  selectors,
  tokens,
  semanticTokens,
})
