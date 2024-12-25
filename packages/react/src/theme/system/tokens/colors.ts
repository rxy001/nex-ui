import { defineTokens } from '@nex-ui/system'

const blue = {
  50: '#E6F1FE',
  100: '#CCE3FD',
  200: '#99C7FB',
  300: '#66AAF9',
  400: '#338EF7',
  500: '#006FEE',
  600: '#005BC4',
  700: '#004493',
  800: '#002E62',
  900: '#14204a',
  contrastText: '#fff',
}

const cyan = {
  50: '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4',
  600: '#0891b2',
  700: '#0c5c72',
  800: '#134152',
  900: '#072a38',
  contrastText: '#fff',
}

const purple = {
  50: '#F2EAFA',
  100: '#E4D4F4',
  200: '#C9A9E9',
  300: '#AE7EDE',
  400: '#9353D3',
  500: '#7828C8',
  600: '#6020A0',
  700: '#481878',
  800: '#301050',
  900: '#2f0553',
  contrastText: '#fff',
}

const pink = {
  50: '#fdf2f8',
  100: '#fce7f3',
  200: '#fbcfe8',
  300: '#f9a8d4',
  400: '#f472b6',
  500: '#ec4899',
  600: '#db2777',
  700: '#a41752',
  800: '#6d0e34',
  900: '#45061f',
  contrastText: '#fff',
}

const gray = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  contrastText: '#fff',
}
const red = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  contrastText: '#fff',
}

const orange = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
  contrastText: '#fff',
}

const yellow = {
  50: '#FEFCE8',
  100: '#FDEDD3',
  200: '#FBDBA7',
  300: '#F9C97C',
  400: '#F7B750',
  500: '#F5A524',
  600: '#C4841D',
  700: '#936316',
  800: '#62420E',
  900: '#713f12',
  contrastText: '#000',
}
const green = {
  50: '#E8FAF0',
  100: '#D1F4E0',
  200: '#A2E9C1',
  300: '#74DFA2',
  400: '#45D483',
  500: '#17C964',
  600: '#12A150',
  700: '#0E793C',
  800: '#095028',
  900: '#052814',
  contrastText: '#000',
}

const rose = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#f43f5e',
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
  contrastText: '#fff',
}

export const colors = defineTokens.colors({
  transparent: 'transparent',
  current: 'currentColor',
  white: '#fff',
  black: '#000',
  blue,
  gray,
  pink,
  purple,
  cyan,
  yellow,
  orange,
  red,
  green,
  rose,
})
