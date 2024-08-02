import { defineConfig } from '@nex-ui/system'
import type { StyleObject } from '@nex-ui/system'
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
import type { ButtonComponentStyles, ButtonVariants } from './components'

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

type ComponentThemeFn<P> = (ownerState: Required<P>) => StyleObject | void

export type Components = {
  button?: ButtonComponentStyles | ComponentThemeFn<ButtonVariants>
}
