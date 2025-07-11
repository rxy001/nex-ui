'use client'

import cn from 'clsx'
import { Select } from 'nextra/components'
import { useMounted } from 'nextra/hooks'
import { useColorScheme } from '@nex-ui/react'
import { MoonFilled, SunFilled } from '@nex-ui/icons'
import { useThemeConfig } from '../stores'
import type { Mode } from '@nex-ui/react'
import type { FC } from 'react'

type ThemeSwitchProps = {
  lite?: boolean
  className?: string
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ lite, className }) => {
  const { mode, setMode, resolvedColorScheme } = useColorScheme()

  const mounted = useMounted()
  const { darkMode, themeSwitch } = useThemeConfig()
  if (!darkMode) {
    return null
  }

  const IconToUse =
    mounted && resolvedColorScheme === 'light' ? SunFilled : MoonFilled
  const id = mounted ? mode! : 'dark'

  const onChange = (v: string) => setMode(v as Mode)

  return (
    <Select
      className={cn('x:flex x:items-center x:gap-2', className)}
      title='Change theme'
      options={[
        { id: 'light', name: themeSwitch.light },
        { id: 'dark', name: themeSwitch.dark },
        { id: 'system', name: themeSwitch.system },
      ]}
      onChange={onChange}
      value={id}
      selectedOption={
        <>
          <IconToUse height='12' />
          {!lite && themeSwitch[id]}
        </>
      }
    />
  )
}
