import { createGlobalTheme } from '@nex-ui/css-system'
import { daybreakBlue } from './colors'

const tokens = {
  colorPrimary: daybreakBlue[5],
  colorPrimaryHover: daybreakBlue[4],
  colorPrimaryActive: daybreakBlue[6],

  controlHeightSM: '24px',
  controlHeight: '32px',
  controlHeightLG: '40px',

  borderRadiusSM: '4px',
  borderRadius: '6px',
  borderRadiusLG: '8px',

  lightFontColor: '#fff',

  textColor: 'rgba(0, 0, 0, 0.88)',

  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',

  lineHeight: '1.5666',
}

export const globalTokens = createGlobalTheme(':root', tokens)

export type Tokens = typeof tokens
