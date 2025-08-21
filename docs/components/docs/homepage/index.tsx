import { Button } from '@nex-ui/react'
import Link from 'next/link'
import { BoltOutlined, MoonOutlined, MagicOutlined } from '@nex-ui/icons'
import AccessibilityIcon from '@/icons/accessibility.svg'
import { Theme, Styling, DarkMode } from './features'
import { Card } from './Card'
import { Gallery } from './Gallery'
import { CopyButton } from './CopyButton'
import { Threads } from './Threads'
import type { ButtonProps } from '@nex-ui/react'
import type { ElementType, ReactNode } from 'react'
import type { ThemeProps } from './features'

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
    accessibility?: Content
  } & ThemeProps['translations']
}

function LinkButton(props: ButtonProps<ElementType>) {
  return (
    <Button
      as={Link}
      radius='full'
      size='sm'
      className='x:w-[110px]'
      color='blue'
      {...props}
    />
  )
}

export function HomePage({ translations }: HomePageProps) {
  const renderHighlight = (value?: Content) => {
    return (
      <div className='x:md:w-1/2'>
        <h1 className='x:font-semibold x:text-4xl x:lg:text-6xl x:lg:leading-[1.1]'>
          {value?.title}
        </h1>
        <p className='x:w-full x:my-2 x:text-lg x:lg:text-xl x:font-normal x:text-gray-500 x:block'>
          {value?.desc}
        </p>
      </div>
    )
  }

  return (
    <main className='x:py-36 x:max-w-[85rem] x:mx-auto x:px-[1.5rem] x:flex x:flex-col x:gap-[200px]'>
      <section className='x:flex x:max-sm:justify-center'>
        <Threads />
        <section className='x:min-[970px]:w-1/2 x:max-md:max-w-[400px]'>
          <h1 className='x:font-semibold x:whitespace-pre-wrap x:sm:text-6xl x:sm:text-left x:text-4xl x:text-center'>
            {translations?.title}
          </h1>
          <h2 className='x:mt-6 x:font-medium x:text-[#71717a] x:text-2xl x:text-center x:sm:text-left'>
            {translations?.desc}
          </h2>
          <div className='x:mt-8 x:flex x:gap-3 x:items-center'>
            <Button
              size='lg'
              href='/docs/getting-started/introduction'
              radius='full'
              className='x:px-5 x:max-sm:w-full'
            >
              {translations?.getStarted}
            </Button>
            <div className='x:bg-[#d4d4d866] x:px-5 x:rounded-full x:h-[48px] x:flex x:items-center x:gap-2 x:max-sm:hidden'>
              <pre className='x:bg-transparent'>~ npm i @nex-ui/react</pre>
              <CopyButton value='npm i @nex-ui/react' />
            </div>
          </div>
        </section>
        <Gallery />
      </section>
      <section className='x:grid x:grid-cols-1 x:md:grid-cols-2 x:lg:grid-cols-4 x:gap-4'>
        <Card icon={<MagicOutlined />} title={translations?.themeable?.title}>
          {translations?.themeable?.desc}
        </Card>
        <Card icon={<MoonOutlined />} title={translations?.colorMode?.title}>
          {translations?.colorMode?.desc}
        </Card>
        <Card icon={<BoltOutlined />} title={translations?.dx?.title}>
          {translations?.dx?.desc}
        </Card>
        <Card
          icon={<AccessibilityIcon />}
          title={translations?.accessibility?.title}
        >
          {translations?.accessibility?.desc}
        </Card>
        {/* <Card icon={<TsIcon />} title={translations?.ts?.title}>
          {translations?.ts?.desc}
        </Card> */}
      </section>
      <section className='x:flex x:flex-col x:gap-[150px]'>
        <div className='x:flex x:flex-col x:gap-5'>
          {renderHighlight(translations?.customization)}
          <Theme translations={translations} />
          <LinkButton
            href='/docs/customization/theming'
            aria-label='Learn more about customization'
          >
            {translations?.learnMore}
          </LinkButton>
        </div>
        <div className='x:flex x:flex-col x:gap-5'>
          {renderHighlight(translations?.styling)}
          <Styling />
          <LinkButton
            href='/docs/styling/sx-prop'
            aria-label='Learn more about styling'
          >
            {translations?.learnMore}
          </LinkButton>
        </div>
        <div className='x:flex x:flex-col x:gap-5'>
          {renderHighlight(translations?.darkMode)}
          <DarkMode />
          <LinkButton
            href='/docs/customization/dark-mode'
            aria-label='Learn more about dark mode'
          >
            {translations?.learnMore}
          </LinkButton>
        </div>
      </section>
    </main>
  )
}
