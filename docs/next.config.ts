/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */

import { resolve } from 'node:path'
import nextra from 'nextra'
import analyzer from '@next/bundle-analyzer'

const withAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
})

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

export default withAnalyzer(
  withNextra({
    i18n: {
      locales: ['zh', 'en'],
      defaultLocale: 'zh',
    },
    webpack: (config) => {
      const fileLoaderRule = config.module.rules.find((rule: any) =>
        rule.test?.test?.('.svg'),
      )

      config.module.rules.push({
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        },
        use: ['@svgr/webpack'],
      })

      config.module.rules.push({
        test: /\.demo.tsx$/i,
        use: ['raw-loader'],
        resourceQuery: /raw/,
      })

      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['@'] = resolve('.')
      config.resolve.alias['@nex-ui/react'] = resolve('../packages/react/src')
      config.resolve.alias['@nex-ui/hooks'] = resolve('../packages/hooks/src')
      config.resolve.alias['@nex-ui/styled'] = resolve('../packages/styled/src')
      config.resolve.alias['@nex-ui/icons'] = resolve('../packages/icons/src')
      config.resolve.alias['@nex-ui/system'] = resolve('../packages/system/src')
      config.resolve.alias['@nex-ui/utils'] = resolve('../packages/utils/src')

      return config
    },
    compiler: {
      emotion: true,
    },
    transpilePackages: [
      '@nex-ui/react',
      '@nex-ui/hooks',
      '@nex-ui/styled',
      '@nex-ui/icons',
      '@nex-ui/system',
      '@nex-ui/utils',
    ],
    async redirects() {
      return [
        {
          source: '/docs/getting-started',
          destination: '/docs/getting-started/introduction',
          permanent: true,
          locale: false,
        },
      ]
    },
    experimental: {
      // 使用 webpack 代替 turbopack 以支持 resourceQuery
      // turbo: {
      //   rules: {
      //     './icons/*.svg': {
      //       loaders: ['@svgr/webpack'],
      //       as: '*.js',
      //     },
      //     './content/**/*.raw.tsx': {
      //       loaders: ['raw-loader'],
      //     },
      //   },
      //   resolveAlias: {
      //     '@': './',
      //   },
      // },
      // 未设置改配置时，webpack 全量导入 icons, why?
      optimizePackageImports: ['@nex-ui/icons'],
    },
  }),
)
