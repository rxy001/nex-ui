import { createGlobalTheme } from '@vanilla-extract/css'

const tokens = {
  colorPrimary: '#1677ff',

  controlHeightSM: '24px',
  controlHeight: '32px',
  controlHeightLG: '40px',

  borderRadiusSM: '4px',
  borderRadius: '6px',
  borderRadiusLG: '8px',
}

export const globalTokens = createGlobalTheme(':root', tokens)

export type Tokens = typeof tokens
