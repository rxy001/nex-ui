import { defineConfig } from '@nex-ui/system'
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  scales,
  sizes,
  borders,
  aliases,
  radii,
} from './system'

export const defaultTheme = defineConfig({
  aliases,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  sizes,
  scales,
  borders,
  radii,
})
