import { defineTokens } from '@nex-ui/system'
import { colors } from './colors'
import { spacing } from './spacing'
import { fontFamilies, fontSizes, fontWeights, lineHeights } from './typography'
import { sizes } from './sizes'
import { borders } from './borders'
import { radii } from './radii'
import { borderWidths } from './borderWidths'
import { shadows } from './shadows'
import { transitions } from './transitions'
import { zIndexes } from './zIndexes'

export const tokens = defineTokens({
  colors,
  sizes,
  spacing,
  fontFamilies,
  fontSizes,
  fontWeights,
  borders,
  radii,
  lineHeights,
  borderWidths,
  shadows,
  transitions,
  zIndexes,
})
