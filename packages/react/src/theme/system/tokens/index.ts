import { defineTokens } from '@nex-ui/system'
import { colors } from './colors'
import { spacing } from './spacing'
import { fontFamilies, fontSizes, fontWeights, lineHeights } from './typography'
import { sizes } from './sizes'
import { borders } from './borders'
import { radii } from './radii'

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
})
