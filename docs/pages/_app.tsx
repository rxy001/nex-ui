import { NexProvider } from '@nex-ui/react'
import '../global.css'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <NexProvider colorSchemeSelector="data-nui-scheme">
      <Component {...pageProps} />
    </NexProvider>
  )
}
