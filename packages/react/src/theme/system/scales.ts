import { defineConfig } from '@nex-ui/system'

export const scales = defineConfig.scales({
  color: 'colors',
  borderColor: 'colors',
  backgroundColor: 'colors',

  fontSize: 'fontSizes',
  borderWidth: 'borders',

  width: 'sizes',
  height: 'sizes',

  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  fontFamily: 'fontFamilies',

  gap: 'spacing',

  padding: 'spacing',
  paddingTop: 'spacing',
  paddingBottom: 'spacing',
  paddingLeft: 'spacing',
  paddingRight: 'spacing',

  marginRight: 'spacing',
  marginTop: 'spacing',
  marginLeft: 'spacing',
  marginBottom: 'spacing',
  margin: 'spacing',

  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
})
