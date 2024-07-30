import { defineConfig } from '@nex-ui/system'
import { button } from './components'
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

export const defaultConfig = defineConfig({
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

export const defaultTheme = {
  components: {
    button,
  },
}
