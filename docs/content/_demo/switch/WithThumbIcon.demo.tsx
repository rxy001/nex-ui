'use client'

import { SunFilled, MoonFilled } from '@nex-ui/icons'
import { Switch } from '@nex-ui/react'
import type { SwitchOwnerState } from '@nex-ui/react'

export default function App() {
  const renderThumbIcon = (e: SwitchOwnerState) =>
    e.checked ? <SunFilled /> : <MoonFilled />

  return (
    <Switch
      color='purple'
      size='lg'
      thumbIcon={renderThumbIcon}
      defaultChecked
    />
  )
}
