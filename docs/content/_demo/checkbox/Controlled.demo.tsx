'use client'

import { Checkbox } from '@nex-ui/react'
import { type ChangeEvent, useState } from 'react'

export default function App() {
  const [checked, setChecked] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked)

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      Option
    </Checkbox>
  )
}
