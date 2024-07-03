import { defineConfig } from '@nex-ui/system'

export const fontFamilies = defineConfig.fontFamilies({
  heading: 'Roboto, Helvetica, Arial, sans-serif',
  body: 'Roboto, Helvetica, Arial, sans-serif',
  mono: `SFMono-Regular, Menlo,Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
})

export const fontSizes = defineConfig.fontSizes({
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
})

export const fontWeights = defineConfig.fontWeights({
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

export const lineHeights = defineConfig.lineHeights({
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
})
