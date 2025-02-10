import { Button } from '@nex-ui/react'
import { type ReactNode } from 'react'
import ThemeableIcon from '@/icons/customize-outlined.svg'
import LightingIcon from '@/icons/lighting-outlined.svg'
import TsIcon from '@/icons/typescript-filled.svg'
import { MoonOutlined } from '@nex-ui/icons'
import { Theme, Layout } from './features'
import type { ThemeProps } from './features'
import { Card } from './Card'
import { Gallery } from './Gallery'
import { CopyButton } from './CopyButton'

type Content = { title?: ReactNode; desc?: ReactNode }

type HomePageProps = {
  translations?: {
    title?: ReactNode
    desc?: ReactNode
    getStarted?: string
    themeable?: Content
    colorMode?: Content
    dx?: Content
    ts?: Content
    styling?: Content
    darkMode?: Content
    customization?: Content
    learnMore?: string
  } & ThemeProps['translations']
}

export function HomePage({ translations }: HomePageProps) {
  const renderHighlight = (value?: Content) => {
    return (
      <div className="x:md:w-1/2">
        <h1 className="x:font-semibold x:text-4xl x:lg:text-6xl x:lg:leading-[1.1]">
          {value?.title}
        </h1>
        <p className="x:w-full x:my-2 x:text-lg x:lg:text-xl x:font-normal x:text-gray-500 x:block">
          {value?.desc}
        </p>
      </div>
    )
  }

  return (
    <main className="x:py-36 x:max-w-[85rem] x:mx-auto x:px-[1.5rem] x:flex x:flex-col x:gap-[200px]">
      <section className="x:flex">
        <section className="x:min-[970px]:w-1/2">
          <h1 className="x:font-semibold x:text-6xl x:whitespace-pre-wrap">
            {translations?.title}
          </h1>
          <h2 className="x:mt-6 x:font-medium x:text-[#71717a] x:text-2xl">
            {translations?.desc}
          </h2>
          <div className="x:mt-8 x:flex x:gap-3 x:items-center">
            <Button
              size="lg"
              href="/docs/getting-started/introduction"
              radius="full"
              className="x:px-5 x:max-sm:w-full"
            >
              {translations?.getStarted}
            </Button>
            <div className="x:bg-[#d4d4d866] x:px-5 x:rounded-full x:h-[48px] x:flex x:items-center x:gap-2 x:max-sm:hidden">
              <pre className="x:bg-transparent">~ npm i @nex-ui/react</pre>
              <CopyButton value="npm i @nex-ui/react" />
            </div>
          </div>
        </section>
        <Gallery />
      </section>
      <section className="x:grid x:grid-cols-1 x:md:grid-cols-2 x:lg:grid-cols-4 x:gap-4">
        <Card icon={<ThemeableIcon />} title={translations?.themeable?.title}>
          {translations?.themeable?.desc}
        </Card>
        <Card icon={<MoonOutlined />} title={translations?.colorMode?.title}>
          {translations?.colorMode?.desc}
        </Card>
        <Card icon={<LightingIcon />} title={translations?.dx?.title}>
          {translations?.dx?.desc}
        </Card>
        <Card icon={<TsIcon />} title={translations?.ts?.title}>
          {translations?.ts?.desc}
        </Card>
      </section>
      <section className="x:flex x:flex-col x:gap-[150px]">
        <div className="x:flex x:flex-col x:gap-5">
          {renderHighlight(translations?.customization)}
          <Theme translations={translations} />
          <Button radius="full" size="sm" className="x:w-[110px]" color="blue">
            {translations?.learnMore}
          </Button>
        </div>
        <div className="x:flex x:flex-col x:gap-5">
          {renderHighlight(translations?.styling)}
          <Layout />
          <Button radius="full" size="sm" className="x:w-[110px]" color="blue">
            {translations?.learnMore}
          </Button>
        </div>
        <div className="x:flex x:flex-col">
          {renderHighlight(translations?.darkMode)}
        </div>
      </section>
    </main>
  )
}
