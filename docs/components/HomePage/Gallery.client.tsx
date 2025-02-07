'use client'

import {
  Avatar,
  Button,
  InputText,
  Switch,
  useColorScheme,
} from '@nex-ui/react'
import type { ChangeEvent } from 'react'
import MoonIcon from '../../icons/moon-filled.svg'
import SunIcon from '../../icons/sun-filled.svg'

export const ClientGallery = () => {
  const { mode, systemColorScheme, setMode } = useColorScheme()

  const toggleMode = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    if (checked) {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  const resolvedColorScheme = systemColorScheme ?? mode

  return (
    <section className="x:w-3/6 x:relative">
      <Button className="x:absolute x:top-[200px] x:left-[200px] x:animate-[levitate_14s_ease_infinite_0.5s]">
        Button
      </Button>
      <Switch
        className="x:absolute! x:-top-[30px] x:-right-[20px] x:animate-[levitate_13s_ease_infinite_1s_reverse]"
        key="switch"
        size="lg"
        startIcon={<SunIcon />}
        endIcon={<MoonIcon />}
        checked={resolvedColorScheme === 'dark'}
        onChange={toggleMode}
      />
      <InputText
        className="x:absolute x:animate-[levitate_10s_ease_infinite] x:top-[130px] x:-right-[40px]"
        defaultValue="NexUI"
      />
      <Avatar
        src="https://avatars.githubusercontent.com/u/25546323?v=4"
        alt="Author"
        className="x:h-18! x:w-18! x:absolute x:animate-[levitate_18s_ease_infinite] x:top-[110px] x:right-[230px]"
        size="lg"
      >
        XY
      </Avatar>
    </section>
  )
}
