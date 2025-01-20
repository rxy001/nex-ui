import { Avatar, Button, InputText, Switch } from '@nex-ui/react'
import { type ReactNode } from 'react'
import MoonIcon from '../../icons/moon-filled.svg'
import SunIcon from '../../icons/sun-filled.svg'
import { Card } from './Card'
import ThemeableIcon from '../../icons/customize-outlined.svg'
import LightingIcon from '../../icons/lighting-outlined.svg'
import DarkIcon from '../../icons/moon-outlined.svg'
import TsIcon from '../../icons/typescript-filled.svg'
import { Playlist, playlistCodeSnippet } from './Playlist'
import { CodeBlock } from './CodeBlock'

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
  }
}

export function HomePage({ translations }: HomePageProps) {
  const renderHighlight = (value?: Content) => {
    return (
      <div className="md:w-1/2">
        <h1 className="font-semibold text-4xl lg:text-6xl lg:leading-[1.1]">
          {value?.title}
        </h1>
        <p className="w-full my-2 text-lg lg:text-xl font-normal text-gray-500 block">
          {value?.desc}
        </p>
      </div>
    )
  }

  return (
    <main className="py-36 max-w-[85rem] mx-auto px-[1.5rem] flex flex-col gap-[200px]">
      <section className="flex">
        <section className="w-3/6">
          <h1 className="font-semibold text-6xl whitespace-pre-wrap">
            {translations?.title}
          </h1>
          <h2 className="mt-6 font-medium text-[#71717a] text-2xl">
            {translations?.desc}
          </h2>
          <div className="mt-8 flex gap-3 items-center">
            <Button
              size="lg"
              href="/docs/guide/installation"
              radius="full"
              sx={{
                px: '1.25rem',
              }}
            >
              {translations?.getStarted}
            </Button>
            <div className="bg-[#d4d4d866] px-5 rounded-full h-[48px] flex items-center">
              <pre className="bg-transparent">~ npm i @nex-ui/react</pre>
            </div>
          </div>
        </section>
        <section className="w-3/6 relative">
          <Button className="absolute top-[200px] left-[200px] animate-[levitate_14s_ease_infinite_0.5s]">
            Button
          </Button>
          <Switch
            className="-top-[30px] -right-[20px] animate-[levitate_13s_ease_infinite_1s_reverse]"
            key="switch"
            size="lg"
            startIcon={<SunIcon />}
            endIcon={<MoonIcon />}
            sx={{
              position: 'absolute',
            }}
          />
          <InputText
            className="absolute animate-[levitate_10s_ease_infinite] top-[130px] -right-[40px]"
            defaultValue="NexUI"
          />
          <Avatar
            src="https://avatars.githubusercontent.com/u/25546323?v=4"
            alt="Author"
            className="absolute animate-[levitate_18s_ease_infinite] top-[110px] right-[230px]"
            size="lg"
            sx={{
              height: 70,
              width: 70,
            }}
          >
            XY
          </Avatar>
        </section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card icon={<ThemeableIcon />} title={translations?.themeable?.title}>
          {translations?.themeable?.desc}
        </Card>
        <Card icon={<DarkIcon />} title={translations?.colorMode?.title}>
          {translations?.colorMode?.desc}
        </Card>
        <Card icon={<LightingIcon />} title={translations?.dx?.title}>
          {translations?.dx?.desc}
        </Card>
        <Card icon={<TsIcon />} title={translations?.ts?.title}>
          {translations?.ts?.desc}
        </Card>
      </section>
      <section className="flex flex-col gap-[150px]">
        <div className="flex flex-col">
          {renderHighlight(translations?.customization)}
        </div>
        <div className="flex flex-col gap-5">
          {renderHighlight(translations?.styling)}
          <div className="flex gap-12 flex-col lg:flex-row">
            <Playlist />
            <CodeBlock lang="tsx" file="Playlist.tsx">
              {playlistCodeSnippet}
            </CodeBlock>
          </div>
        </div>
        <div className="flex flex-col">
          {renderHighlight(translations?.darkMode)}
        </div>
      </section>
    </main>
  )
}
