import Image from 'next/image'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { InitColorSchemeScript, NexUIProvider } from '@nex-ui/react'
import logo from '@/public/images/logo.png'
import {
  LastUpdated,
  Layout,
  LocaleSwitch,
  Navbar,
  ThemeSwitch,
  Footer,
} from '@/nextraTheme'
import '@/globals.css'
import { StructuredData } from '@/components/StructuredData'
import { getDictionary } from '../_dictionaries/getDictionary'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nex UI - Beautiful, Modern & Reliable React Component Library',
  description:
    'Build beautiful user interfaces with Nex UI - a modern React component library featuring theme customization, dark mode support, TypeScript integration, and exceptional developer experience.',
  keywords: [
    'React',
    'Next.js',
    'Emotion',
    'Nex UI',
    'React Components',
    'UI Components',
    'UI Kit',
    'UI Library',
    'UI Framework',
    'Design System',
    'TypeScript',
    'Theme Customization',
    'Dark Mode',
    'Responsive Design',
    'Accessibility',
    'WCAG',
    'CSS-in-JS',
    'Component Library',
    'Frontend Framework',
    'Web Development',
    'JavaScript Library',
    'Open Source',
    'Modern UI',
    'Beautiful Components',
    'Developer Experience',
  ],
  authors: [{ name: 'X1ng Yu', url: 'https://github.com/rxy001' }],
  creator: 'X1ng Yu',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nex-ui-docs.vercel.app',
    siteName: 'Nex UI',
    title: 'Nex UI - Beautiful, Modern & Reliable React Component Library',
    description:
      'Build beautiful user interfaces with Nex UI - a modern React component library featuring theme customization, dark mode support, and exceptional developer experience.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Nex UI - React Component Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nex UI - Beautiful, Modern & Reliable React Component Library',
    description:
      'Build beautiful user interfaces with Nex UI - a modern React component library featuring theme customization, dark mode support, and exceptional developer experience.',
    images: ['/og-image.svg'],
    creator: '@nex_ui',
  },
  appleWebApp: {
    title: 'Nex UI',
    statusBarStyle: 'default',
    capable: true,
  },
  metadataBase: new URL('https://nex-ui-docs.vercel.app'),
  category: 'technology',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default async function RootLayout({ children, params }: any) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  const pageMap = await getPageMap(`/${lang}`)

  const navbar = (
    <Navbar
      logo={
        <div className='x:flex x:items-center x:text-[24px] x:gap-1'>
          <Image src={logo} height={45} width={45} alt='logo' />
          <span
            className='x:text-zinc-700 x:dark:text-[#f7f7f7]'
            title={`Nex UI: ${dictionary.logo.title}`}
          >
            Nex UI
          </span>
        </div>
      }
      projectLink='https://github.com/rxy001/nex-ui'
    >
      <>
        <LocaleSwitch className='x:hidden x:md:flex' />
        <ThemeSwitch className='x:hidden x:md:flex' />
      </>
    </Navbar>
  )
  const footer = <Footer>© 2025 Nex UI · Made by X1ngYu</Footer>

  return (
    <html lang={lang} dir='ltr' suppressHydrationWarning>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <meta
          name='google-site-verification'
          content='SEV1xf1Qi1Fw0dt-ZRQe4tTZ7w-XMuQ3YbyFEpxVQhg'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap'
          rel='stylesheet'
        />
        <InitColorSchemeScript colorSchemeSelector='class' defaultMode='dark' />
        <StructuredData type='website' />
        <StructuredData type='software' />
      </Head>
      <body>
        <Banner dismissible={false}>
          Right now there is no stable version available for this library.
          We&apos;re just working on it. 🚀
        </Banner>
        <NexUIProvider
          colorScheme={{ colorSchemeSelector: 'class', defaultMode: 'dark' }}
        >
          <Layout
            navbar={navbar}
            footer={footer}
            docsRepositoryBase='https://github.com/rxy001/nex-ui/tree/main/docs'
            i18n={[
              { locale: 'en', name: 'English' },
              { locale: 'zh', name: '中文' },
            ]}
            sidebar={{
              defaultMenuCollapseLevel: 2,
              autoCollapse: false,
              toggleButton: false,
            }}
            toc={{
              backToTop: dictionary.backToTop,
              title: dictionary.tocTitle,
            }}
            editLink={dictionary.editPage}
            pageMap={pageMap}
            lastUpdated={<LastUpdated>{dictionary.lastUpdated}</LastUpdated>}
            themeSwitch={{
              dark: dictionary.dark,
              light: dictionary.light,
              system: dictionary.system,
            }}
            feedback={{
              content: dictionary.feedback.content,
            }}
          >
            {children}
          </Layout>
        </NexUIProvider>
      </body>
    </html>
  )
}
