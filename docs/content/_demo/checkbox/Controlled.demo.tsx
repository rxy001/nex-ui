'use client'

import { Checkbox } from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [checked, setChecked] = useState(true)

  return (
    <Checkbox checked={checked} onCheckedChange={setChecked}>
      Option
    </Checkbox>
  )
}
