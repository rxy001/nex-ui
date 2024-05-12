import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'

export const parameters: Preview['parameters'] = {
  darkMode: {
    current: 'dark',
    stylePreview: true,
    darkClass: 'dark',
    lightClass: 'light',
    classTarget: 'html',
    dark: {
      ...themes.dark,
    },
    light: {
      ...themes.light,
    },
  },
}
