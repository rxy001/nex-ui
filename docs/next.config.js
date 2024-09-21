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
    '@nex-ui/icons',
  ],
  ...withNextra(),
  webpack: (config, options) => {
    const nextraWebpack = withNextra().webpack(config, options)

    const fileLoaderRule = nextraWebpack.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    nextraWebpack.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )
    nextraWebpack.resolve.alias = {
      ...nextraWebpack.resolve.alias,
      '@': resolve('.'),
      '@nex-ui/react': resolve('../packages/react/src'),
      '@nex-ui/utils': resolve('../packages/utils/src'),
      '@nex-ui/system': resolve('../packages/system/src'),
      '@nex-ui/styled': resolve('../packages/styled/src'),
      '@nex-ui/icons': resolve('../packages/icons/src'),
    }

    nextraWebpack.resolve.alias.react = resolve('./node_modules/react')
    nextraWebpack.resolve.alias['react-dom'] = resolve(
      './node_modules/react-dom',
    )
    nextraWebpack.resolve.alias['@emotion/react'] = resolve(
      './node_modules/@emotion/react',
    )

    // node_modules 中 package 有 export source
    // nextraWebpack.resolve.conditionNames = [
    //   'source',
    //   'import',
    //   'module',
    //   'require',
    //   'browser',
    // ]

    return nextraWebpack
  },
  i18n: {
    locales: ['default', 'en', 'zh'],
    defaultLocale: 'default',
  },
}
