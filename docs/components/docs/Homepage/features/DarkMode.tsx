import { MusicPlayer } from './demos'
import { CodeWindow } from '../CodeWindow'

const darkModeCode = `import { NexUIProvider, useColorScheme } from '@nex-ui/react'

export function App({ children }) {
  const { mode, setMode, systemColorScheme } = useColorScheme()

  return (
    <NexUIProvider colorScheme={{ defaultMode: 'dark' }}>
      {children}
    </NexUIProvider>
  )
}
`

export const DarkMode = () => {
  return (
    <div className='x:flex x:gap-12 x:flex-col x:lg:flex-row'>
      <MusicPlayer />
      <CodeWindow lang='tsx' file='app/layout.tsx' className='x:lg:w-1/2'>
        {darkModeCode}
      </CodeWindow>
    </div>
  )
}
