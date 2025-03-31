'use client'

import { useState } from 'react'
import { Checkbox, CheckboxGroup } from '@nex-ui/react'

export default function App() {
  const [value, setValue] = useState(['pear'])

  return (
    <CheckboxGroup value={value} onValueChange={setValue}>
      <Checkbox value='apple'>Apple</Checkbox>
      <Checkbox value='pear'>Pear</Checkbox>
      <Checkbox value='orange'>Orange</Checkbox>
    </CheckboxGroup>
  )
}
