import Image from 'next/image'
import { useRouter } from 'next/router'
import { NexProvider } from '@nex-ui/react'

export default {
  logo: (
    <div
      style={{ display: 'flex', alignItems: 'center', fontSize: 22, gap: 4 }}
    >
      <Image src="/logo.png" height={45} width={45} />
      <span>Nex UI</span>
    </div>
  ),
  head: (
    <>
      <meta
        name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
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
  ),
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Nex UI',
      }
    }
    return {
      titleTemplate: 'Nex UI',
    }
  },

  docsRepositoryBase: 'https://github.com/rxy001/nex-ui/tree/main/docs',
  project: {
    link: 'https://github.com/rxy001/nex-ui',
  },
  navigation: {
    prev: false,
    next: false,
  },
  footer: {
    component: null,
  },
  search: {
    placeholder: 'Search...',
  },
  toc: {
    backToTop: true,
    title: 'CONTENTS',
    float: true,
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  i18n: [
    { locale: 'zh', text: '中文' },
    { locale: 'en', text: 'English' },
  ],
  main: ({ children }) => {
    return <NexProvider>{children}</NexProvider>
  },
}
