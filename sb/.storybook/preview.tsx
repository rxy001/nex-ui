import { NexUIProvider } from '@nex-ui/react'
import { withTheme } from './withTheme.decorator'
import { allModes } from './modes'
import type { ReactRenderer, Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    chromatic: {
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
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
      <NexUIProvider
        colorScheme={{
          colorSchemeSelector: 'class',
        }}
      >
        <Story />
      </NexUIProvider>
    ),
  ],

  // tags: ['autodocs'],
}

export default preview
