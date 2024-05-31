import nextra from 'nextra'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

export default {
  transpilePackages: ['@nex-ui/react'],
  ...withNextra(),
  webpack: (config, options) => {
    const nextraWebpack = withNextra().webpack(config, options)

    return withVanillaExtract().webpack(nextraWebpack, options)
  },
  i18n: {
    locales: ['default', 'en', 'zh'],
    defaultLocale: 'default',
  },
}
