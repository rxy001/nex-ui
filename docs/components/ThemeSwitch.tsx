import { useColorScheme } from '@nex-ui/react'
import { useMounted } from 'nextra/hooks'
import { useTheme } from 'nextra-theme-docs'
import { MoonIcon, SunIcon } from 'nextra/icons'
import type { ReactElement } from 'react'
import { Select } from './Select'

type ThemeSwitchProps = {
  options: { key: string; name: string }[]
  className?: string
}

export function ThemeSwitch({
  options,
  className,
}: ThemeSwitchProps): ReactElement {
  const { mode, setMode } = useColorScheme()
  const { setTheme } = useTheme()
  const mounted = useMounted()

  const IconToUse = mounted && mode === 'dark' ? MoonIcon : SunIcon

  return (
    <Select
      title="Change theme"
      className={className}
      options={options}
      onChange={(option) => {
        setMode(option.key as any)
        setTheme(option.key)
      }}
      selected={{
        key: mode!,
        name: (
          <div className="_flex _items-center _gap-2 _capitalize">
            <IconToUse />
            <span>{mounted ? mode : 'light'}</span>
          </div>
        ),
      }}
    />
  )
}
