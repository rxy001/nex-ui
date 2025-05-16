import { Html, Head, Main, NextScript } from 'next/document'
import { InitColorSchemeScript } from '@nex-ui/react'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <InitColorSchemeScript colorSchemeSelector='class' />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
