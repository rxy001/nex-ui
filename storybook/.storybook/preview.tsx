import { withThemeByClassName } from '@storybook/addon-themes'
import { NexProvider } from '@nex-ui/react'
import type { ReactRenderer, Preview } from '@storybook/react'
import { themes } from '@storybook/theming'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },

  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'light',
      themes: {
        light: 'light',
        dark: 'dark',
      },
    }),
    (Story: any) => (
      <NexProvider>
        <Story />
      </NexProvider>
    ),
  ],
}

export default preview
