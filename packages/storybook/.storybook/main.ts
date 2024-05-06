import type { StorybookConfig } from '@storybook/react-vite'

export default {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../../components/**/stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../../core/theme/stories/*.stories.@(js|jsx|ts|tsx)',
  ],
} satisfies StorybookConfig
