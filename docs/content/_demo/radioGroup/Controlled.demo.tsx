'use client'

import { RadioGroup, Radio, Flex } from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [value, setValue] = useState('apple')

  return (
    <Flex direction='column' gap='5'>
      <RadioGroup label='Select a fruit' value={value} onValueChange={setValue}>
        <Radio value='apple'>Apple</Radio>
        <Radio value='banana'>Banana</Radio>
        <Radio value='cherry'>Cherry</Radio>
      </RadioGroup>
      <p>Selected: {value}</p>
    </Flex>
  )
}
