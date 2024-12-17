import { useColorScheme } from '@nex-ui/react'
import { useMounted } from 'nextra/hooks'
import { useTheme } from 'nextra-theme-docs'
import { MoonIcon, SunIcon } from 'nextra/icons'
import type { ReactElement } from 'react'
import { Select } from './Select'

export function ThemeSwitch(): ReactElement {
  const { mode, setMode } = useColorScheme()
  const { setTheme } = useTheme()
  const mounted = useMounted()

  const IconToUse = mounted && mode === 'dark' ? MoonIcon : SunIcon

  return (
    <Select
      title="Change theme"
      options={[
        { key: 'light', name: 'Light' },
        { key: 'dark', name: 'Dark' },
        { key: 'system', name: 'System' },
      ]}
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
