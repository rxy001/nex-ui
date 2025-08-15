'use client'

import { useState } from 'react'
import { Flex, Switch } from '@nex-ui/react'
import type { ChangeEvent } from 'react'

export default function App() {
  const [checked, setChecked] = useState(true)

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked)

  return (
    <Flex direction='column' gap='5'>
      <Switch checked={checked} onChange={onChange} size='lg' />
      <p>Checked: {checked ? 'Yes' : 'No'}</p>
    </Flex>
  )
}
