import type { StorybookConfig } from '@storybook/react-vite'

export default {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../../packages/*/src/**/__stories__/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
  features: {
    backgrounds: false,
  },
} satisfies StorybookConfig
