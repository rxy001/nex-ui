import { themes } from '@storybook/theming'
import { NexProvider, defaultTheme } from '@nex-ui/react'

const preview = {
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
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story: any) => (
      <NexProvider theme={defaultTheme}>
        <Story />
      </NexProvider>
    ),
  ],
}

export default preview
