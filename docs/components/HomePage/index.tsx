import { Button } from '@nex-ui/react'

type HomePageProps = {
  translations: Record<string, string>
}
export function HomePage({ translations }: HomePageProps) {
  return (
    <div className="pt-36">
      <h1 className="font-extrabold text-5xl text-center">Nex UI</h1>
      <div className="text-center mt-3 text-lg font-medium">
        {translations.subtitle}
      </div>
      <div className="text-center mt-3 text-lg font-medium">
        {translations.desc}
      </div>
      <div className="mt-8 flex justify-center gap-3">
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
        <div className="bg-[#d4d4d866] px-5 rounded-full h-[40px] flex items-center">
          <pre className="bg-transparent">~ npm i @nex-ui/react</pre>
        </div>
      </div>
    </div>
  )
}
