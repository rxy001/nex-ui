'use client'

import cn from 'clsx'
import { Select } from 'nextra/components'
import { useMounted } from 'nextra/hooks'
import { useColorScheme } from '@nex-ui/react'
import type { Mode } from '@nex-ui/react'
import { MoonIcon, SunIcon } from 'nextra/icons'
import type { FC } from 'react'
import { useThemeConfig } from '../stores'

type ThemeSwitchProps = {
  lite?: boolean
  className?: string
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ lite, className }) => {
  const { mode, setMode, systemColorScheme } = useColorScheme()

  const mounted = useMounted()
  const { darkMode, themeSwitch } = useThemeConfig()
  if (!darkMode) {
    return null
  }

  const resolvedColorScheme = systemColorScheme ?? mode
  const IconToUse =
    mounted && resolvedColorScheme === 'dark' ? MoonIcon : SunIcon
  const id = mounted ? mode! : 'light'

  const onChange = (v: string) => setMode(v as Mode)

  return (
    <Select
      className={cn('x:flex x:items-center x:gap-2', className)}
      title="Change theme"
      options={[
        { id: 'light', name: themeSwitch.light },
        { id: 'dark', name: themeSwitch.dark },
        { id: 'system', name: themeSwitch.system },
      ]}
      onChange={onChange}
      value={id}
      selectedOption={
        <>
          <IconToUse height="12" />
          {!lite && themeSwitch[id]}
        </>
      }
    />
  )
}
