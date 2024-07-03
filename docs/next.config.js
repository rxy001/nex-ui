import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

export default {
  transpilePackages: ['@nex-ui/react'],
  ...withNextra(),
  webpack: (config, options) => {
    const nextraWebpack = withNextra().webpack(config, options)

    return nextraWebpack
  },
  i18n: {
    locales: ['default', 'en', 'zh'],
    defaultLocale: 'default',
  },
}
