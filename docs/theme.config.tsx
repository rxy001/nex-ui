import Image from 'next/image'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'nextra/hooks'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import logo from './public/logo.png'
import { ThemeSwitch, LocaleSwitch } from './components'

const pageTitle =
  'Nex UI - Beautiful, modern and high-quality React UI library.'

const theme: DocsThemeConfig = {
  logo: () => (
    <div
      style={{ display: 'flex', alignItems: 'center', fontSize: 22, gap: 4 }}
    >
      <Image src={logo} height={45} width={45} alt="logo" />
      <span>Nex UI</span>
    </div>
  ),
  head: function useHead() {
    const config = useConfig()
    const { route, locale } = useRouter()

    const title =
      route === `/${locale}` ? pageTitle : `${config.title} - ${pageTitle}`

    return (
      <>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:title" content="NexUI" />
        <meta
          property="og:description"
          content="NexUI is a UI library for React that helps you build beautiful user interfaces."
        />
        <meta
          name="keywords"
          content="React,Next.js,Emotion,NexUI,React,Server Components,React Components,UI Components,UI Kit,UI Library,UI Framework,UI Design System"
        />
        <link rel="icon" href="/logo.png" />
      </>
    )
  },
  docsRepositoryBase: 'https://github.com/rxy001/nex-ui/tree/main/docs',
  project: {
    link: 'https://github.com/rxy001/nex-ui',
  },
  navigation: {
    prev: false,
    next: false,
  },
  gitTimestamp: () => null,
  search: {
    placeholder: 'Search...',
  },
  toc: {
    backToTop: true,
    float: true,
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  themeSwitch: {
    component: null,
  },
  navbar: {
    extraContent: (
      <>
        <LocaleSwitch />
        <ThemeSwitch />
      </>
    ),
  },
  footer: {
    component: function Footer() {
      return null
    },
  },
}

export default theme
