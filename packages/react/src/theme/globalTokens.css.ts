import { createGlobalTheme } from '@nex-ui/css-system'
import { daybreakBlue } from './colors'
import { normalizeVar } from './utils'

const tokens = {
  colorPrimary: daybreakBlue[5],
  colorPrimaryHover: daybreakBlue[4],
  colorPrimaryActive: daybreakBlue[6],

  controlHeightSm: '24px',
  controlHeight: '32px',
  controlHeightLg: '40px',

  borderRadiusSm: '4px',
  borderRadius: '6px',
  borderRadiusLg: '8px',

  lightFontColor: '#fff',

  textColor: 'rgba(0, 0, 0, 0.88)',

  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',

  lineHeight: '1.5666',
}

export const globalTokens = createGlobalTheme(
  ':root',
  tokens,
  normalizeVar('nexui'),
)

export type GlobalTokens = typeof tokens
