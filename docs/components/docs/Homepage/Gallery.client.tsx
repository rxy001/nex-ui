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
      />
      <Input
        className='x:absolute x:animate-[levitate_10s_ease_infinite] x:top-[130px] x:-right-[40px]'
        defaultValue='Nex UI'
      />
      <Avatar
        src='https://avatars.githubusercontent.com/u/25546323?v=4'
        alt='Author'
        className='x:h-18! x:w-18! x:absolute x:animate-[levitate_18s_ease_infinite] x:top-[110px] x:right-[230px]'
        size='lg'
      >
        XY
      </Avatar>
    </section>
  )
}
