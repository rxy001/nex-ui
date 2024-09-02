/** @type {import('next').NextConfig} */

import { resolve } from 'node:path'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

export default {
  compiler: {
    emotion: true,
  },
  transpilePackages: [
    '@nex-ui/react',
    '@nex-ui/system',
    '@nex-ui/styled',
    '@nex-ui/utils',
  ],
  ...withNextra(),
  webpack: (config, options) => {
    const nextraWebpack = withNextra().webpack(config, options)
    nextraWebpack.resolve.alias = {
      ...nextraWebpack.resolve.alias,
      '@': resolve('.'),
      '@nex-ui/react': resolve('../packages/react/src'),
      '@nex-ui/utils': resolve('../packages/utils/src'),
      '@nex-ui/system': resolve('../packages/system/src'),
      '@nex-ui/styled': resolve('../packages/styled/src'),
    }

    return nextraWebpack
  },
  i18n: {
    locales: ['default', 'en', 'zh'],
    defaultLocale: 'default',
  },
}
