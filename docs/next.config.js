/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */

import { resolve } from 'node:path'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        dark: 'github-dark',
        light: 'github-dark',
      },
    },
  },
})

export default {
  ...withNextra({
    i18n: {
      locales: ['zh', 'en'],
      defaultLocale: 'zh',
    },
    webpack: (config) => {
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      )

      config.module.rules.push(
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

      config.resolve.alias['@'] = resolve('.')
      config.resolve.alias['@nex-ui/react'] = resolve('../packages/react/src')
      config.resolve.alias['@nex-ui/utils'] = resolve('../packages/utils/src')
      config.resolve.alias['@nex-ui/system'] = resolve('../packages/system/src')
      config.resolve.alias['@nex-ui/styled'] = resolve('../packages/styled/src')
      config.resolve.alias['@nex-ui/icons'] = resolve('../packages/icons/src')
      config.resolve.alias.react = resolve('./node_modules/react')
      config.resolve.alias['react-dom'] = resolve('./node_modules/react-dom')
      config.resolve.alias['@emotion/react'] = resolve(
        './node_modules/@emotion/react',
      )

      // node_modules 中 package 有 export source
      // config.resolve.conditionNames = [
      //   'source',
      //   'import',
      //   'module',
      //   'require',
      //   'browser',
      // ]

      return config
    },
  }),
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
}
