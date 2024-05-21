import { createTheme } from '@vanilla-extract/css'

const tokens = {
  paddingY: '4px',
  paddingX: '15px',
  paddingYSM: '0px',
  paddingXSM: '7px',
  paddingYLG: '7px',
  paddingXLG: '15px',

  fontSizeSM: '14px',
  fontSize: '14px',
  fontSizeLG: '16px',
}

export const [btnCls, btnTokens] = createTheme(tokens)

export type BtnTokens = typeof tokens
