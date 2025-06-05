'use client'

import { useState } from 'react'
import { Switch } from '@nex-ui/react'
import type { ChangeEvent } from 'react'

export default function App() {
  const [checked, setChecked] = useState(true)

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked)

  return <Switch checked={checked} onChange={onChange} />
}
