import Image from 'next/image'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { InitColorSchemeScript } from '@nex-ui/react'
import type { Metadata } from 'next'
import logo from '@/public/images/logo.png'
import {
  LastUpdated,
  Layout,
  LocaleSwitch,
  Navbar,
  ThemeSwitch,
  Footer,
} from '@/nextraTheme'
import { getDictionary } from '../_dictionaries/getDictionary'
import '@/globals.css'

export const metadata: Metadata = {
  appleWebApp: {
    title: 'Nex UI',
  },
  keywords:
    'React,Next.js,Emotion,Nex UI,React,Server Components,React Components,UI Components,UI Kit,UI Library,UI Framework,UI Design System',
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
        <LocaleSwitch className='x:hidden x:lg:flex' />
        <ThemeSwitch className='x:hidden x:lg:flex' />
      </>
    </Navbar>
  )
  const footer = <Footer>© 2025 Nex UI · Made by X1ngYu</Footer>

  return (
    <html lang={lang} dir='ltr' suppressHydrationWarning>
      <Head>
        <link rel='shortcut icon' href={logo.src} />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap'
          rel='stylesheet'
        />
        <InitColorSchemeScript colorSchemeSelector='class' />
      </Head>
      <body>
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
      </body>
    </html>
  )
}
