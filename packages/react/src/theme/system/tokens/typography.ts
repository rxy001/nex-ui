import { defineTokens } from '@nex-ui/system'

export const fontFamilies = defineTokens.fontFamilies({
  heading: 'Roboto, Helvetica, Arial, sans-serif',
  body: 'Roboto, Helvetica, Arial, sans-serif',
  mono: `SFMono-Regular, Menlo,Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
})

export const fontSizes = defineTokens.fontSizes({
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '18px',
})

export const fontWeights = defineTokens.fontWeights({
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
})

export const lineHeights = defineTokens.lineHeights({
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
})
