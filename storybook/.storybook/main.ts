import type { StorybookConfig } from '@storybook/react-vite'

export default {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../../packages/**/__stories__/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', 'storybook-dark-mode'],
} satisfies StorybookConfig
