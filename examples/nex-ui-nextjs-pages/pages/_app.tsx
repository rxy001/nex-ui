import '@/styles/globals.css'
import { NexUIProvider } from '@nex-ui/react'
import type { AppProps } from 'next/app'

const colorScheme = { colorSchemeSelector: 'class' }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NexUIProvider colorScheme={colorScheme}>
      <Component {...pageProps} />
    </NexUIProvider>
  )
}
