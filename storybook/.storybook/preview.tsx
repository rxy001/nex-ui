import { NexProvider } from '@nex-ui/react'
import { themes } from '@storybook/theming'

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
      <NexProvider>
        <Story />
      </NexProvider>
    ),
  ],
}

export default preview
