import type { StorybookConfig } from '@storybook/react-vite'

export default {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../../components/**/stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../../theme/stories/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', 'storybook-dark-mode'],
} satisfies StorybookConfig
