import { Button } from '@nex-ui/react'
import type { ReactNode } from 'react'

type HomePageProps = {
  translations: Record<string, ReactNode>
}
export function HomePage({ translations }: HomePageProps) {
  return (
    <main className="pt-36 max-w-[90rem] mx-auto px-[1.5rem] ">
      <section className="w-3/6">
        <h1 className="font-semibold text-6xl whitespace-pre-wrap">
          {translations.title}
        </h1>
        <h2 className="mt-6 font-medium text-[#71717a] text-2xl">
          {translations.desc}
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
            {translations.getStarted}
          </Button>
          <div className="bg-[#d4d4d866] px-5 rounded-full h-[48px] flex items-center">
            <pre className="bg-transparent">~ npm i @nex-ui/react</pre>
          </div>
        </div>
      </section>
    </main>
  )
}
