import { CodeWindow } from '../CodeWindow'
import { Playlist, playlistCode } from './demos'

export const Styling = () => {
  return (
    <div className='x:flex x:gap-12 x:flex-col x:lg:flex-row'>
      <Playlist />
      <CodeWindow lang='tsx' file='Playlist.tsx' className='x:lg:flex-1'>
        {playlistCode}
      </CodeWindow>
    </div>
  )
}
