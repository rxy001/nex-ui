import { NexUIProvider } from '@nex-ui/react'
import type { ReactRenderer, Preview } from '@storybook/react'
// eslint-disable-next-line import/no-relative-packages
import { themes } from '../node_modules/@storybook/theming'
import { withTheme } from './withTheme.decorator'

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
    withTheme<ReactRenderer>({
      defaultTheme: 'light',
      themes: {
        light: 'light',
        dark: 'dark',
      },
    }),
    (Story: any) => (
      <NexUIProvider>
        <Story />
      </NexUIProvider>
    ),
  ],
}

export default preview
