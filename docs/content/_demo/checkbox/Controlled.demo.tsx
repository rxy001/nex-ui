'use client'

import { Checkbox, Flex } from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [checked, setChecked] = useState(true)

  return (
    <Flex direction='column' gap='5'>
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        Option
      </Checkbox>
      <p>Checked: {checked ? 'Yes' : 'No'}</p>
    </Flex>
  )
}
