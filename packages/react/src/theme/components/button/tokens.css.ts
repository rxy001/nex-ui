import { createTheme } from '@nex-ui/css-system'
import { globalTokens } from '../../globalTokens.css'

const tokens = {
  // medium size
  paddingY: '4px',
  paddingX: '15px',
  fontSize: '14px',

  // small size
  paddingYSM: '0px',
  paddingXSM: '7px',
  fontSizeSM: '14px',

  // large size
  paddingYLG: '7px',
  paddingXLG: '15px',
  fontSizeLG: '16px',

  // disabled
  fontColorDisabled: 'rgba(0, 0, 0, 0.25)',
  backgroundColorDisabled: 'rgba(0, 0, 0, 0.04)',
  borderColorDisabled: '#d9d9d9',

  // primary variant
  primaryFontColor: '#fff',
  primaryBorderColor: 'transparent',

  // outline variant
  outlineBorderColor: '#d9d9d9',
  outlineBgc: '#fff',
  outlineFontColor: 'rgba(0, 0, 0, 0.88)',
  outlineHoverBgc: '#fff',
  outlineHoverBorderColor: globalTokens.colorPrimaryHover,
  outlineHoverColor: globalTokens.colorPrimaryHover,
  outlineActiveBgc: '#fff',
  outlineActiveBorderColor: globalTokens.colorPrimaryActive,
  outlineActiveFontColor: globalTokens.colorPrimaryActive,

  // text variant
  textHoverBgc: 'rgba(0, 0, 0, 0.06)',
  textActiveBgc: 'rgba(0, 0, 0, 0.15)',

  // lint variant
  linkHoverBgc: 'transparent',
  linkActiveBgc: 'transparent',
}

export const [tokenClasses, btnTokens] = createTheme(tokens)

export type BtnTokens = typeof tokens
