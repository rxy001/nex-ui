import { builtInColors } from './built-in'

const themeColorsBasic = {
  colorPrimary: builtInColors.daybreakBlue[5],
}

const themeColorsDark = {
  backgoundColor: '#7d8999',
}

const themeColorsLight = {
  backgoundColor: '#222425',
}

export { themeColorsLight, themeColorsDark, themeColorsBasic }

export type ThemeColorsBasic = typeof themeColorsBasic
export type ThemeColorsLight = typeof themeColorsLight
export type ThemeColorsDark = typeof themeColorsDark
