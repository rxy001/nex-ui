'use client'

import { Avatar, Button, Input, Switch, useColorScheme } from '@nex-ui/react'
import { useEvent } from '@nex-ui/hooks'
import { MoonFilled, SunFilled } from '@nex-ui/icons'
import type { ChangeEvent } from 'react'

export const ClientGallery = () => {
  const { mode, systemColorScheme, setMode } = useColorScheme()

  const toggleMode = useEvent((e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    setMode(checked ? 'dark' : 'light')
  })

  const resolvedColorScheme = systemColorScheme ?? mode

  return (
    <section className='x:w-1/2 x:relative x:max-[970px]:hidden'>
      <Button className='x:absolute x:top-[200px] x:left-[200px] x:animate-[levitate_14s_ease_infinite_0.5s]'>
        Button
      </Button>
      <Switch
        className='x:absolute! x:-top-[30px] x:-right-[20px] x:animate-[levitate_13s_ease_infinite_1s_reverse]'
        key='switch'
        size='lg'
        startIcon={<SunFilled />}
        endIcon={<MoonFilled />}
        checked={resolvedColorScheme === 'dark'}
        onChange={toggleMode}
        aria-label='Toggle dark mode'
      />
      <Input
        className='x:absolute! x:animate-[levitate_10s_ease_infinite] x:top-[130px] x:-right-[40px]'
        label='Nex UI'
      />
      <div className='x:absolute x:animate-[levitate_18s_ease_infinite] x:top-[-10px] x:left-[200px] x:size-[140px] x:flex x:items-center x:justify-center x:flex-wrap x:shrink-0 x:gap-4 x:py-4 x:shadow-sm x:dark:bg-[#18181b] x:rounded-3xl'>
        <Avatar src='/avatars/avatar-1.jpg' alt='Avatar' size='lg' outlined />
        <Avatar
          src='/avatars/avatar-2.jpg'
          size='lg'
          alt='Avatar'
          outlined
          color='orange'
        />
        <Avatar
          size='lg'
          src='/avatars/avatar-3.webp'
          alt='Avatar'
          outlined
          color='pink'
        />
        <Avatar
          size='lg'
          src='/avatars/avatar-4.jpg'
          alt='Avatar'
          outlined
          color='purple'
        />
      </div>
    </section>
  )
}
