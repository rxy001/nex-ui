/** @type {import('next').NextConfig} */

import { resolve } from 'node:path'
import nextra from 'nextra'

const withNextra = nextra({
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

export default withNextra({
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        },
        use: ['@svgr/webpack'],
      },
    )

    config.module.rules.push({
      test: /\.raw.tsx$/i,
      use: ['raw-loader'],
    })

    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@'] = resolve('.')

    // 不使用 conditionNames, 因为 node_modules 中 某些 package 有 export.source
    // config.resolve.alias['@nex-ui/react'] = resolve('../packages/react/src')
    // config.resolve.alias['@nex-ui/utils'] = resolve('../packages/utils/src')
    // config.resolve.alias['@nex-ui/system'] = resolve('../packages/system/src')
    // config.resolve.alias['@nex-ui/styled'] = resolve('../packages/styled/src')
    // config.resolve.alias['@nex-ui/icons'] = resolve('../packages/icons/src')
    // config.resolve.alias.react = resolve('./node_modules/react')
    // config.resolve.alias['react-dom'] = resolve('./node_modules/react-dom')
    // config.resolve.alias['@emotion/react'] = resolve(
    //   './node_modules/@emotion/react',
    // )

    return config
  },
  compiler: {
    emotion: true,
  },
  experimental: {
    turbo: {
      rules: {
        './icons/*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
        './content/**/*.raw.tsx': {
          loaders: ['raw-loader'],
        },
      },
      resolveAlias: {
        '@': './',
      },
    },
  },
})
