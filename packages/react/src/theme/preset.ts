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
import type { button } from './components'
import type { ExtractComponentType } from './types'

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

export type Components = {
  button?: ExtractComponentType<typeof button>
}
