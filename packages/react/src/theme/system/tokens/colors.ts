import { defineTokens } from '@nex-ui/system'

const blue = {
  50: '#e6f4ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#a3cfff',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#173da6',
  800: '#1a3478',
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
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#641ba3',
  800: '#4a1772',
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
  50: '#fefce8',
  100: '#fef9c3',
  200: '#fef08a',
  300: '#fde047',
  400: '#facc15',
  500: '#eab308',
  600: '#ca8a04',
  700: '#a16207',
  800: '#854d0e',
  900: '#713f12',
  contrastText: '#fff',
}
const green = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
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
})
