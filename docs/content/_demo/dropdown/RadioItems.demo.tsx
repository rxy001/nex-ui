'use client'

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownRadioItem,
  DropdownRadioItemGroup,
  DropdownItemGroupLabel,
} from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [selectedFruit, setSelectedFruit] = useState<string>('apple')
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='faded'>Select a fruit</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownRadioItemGroup
          value={selectedFruit}
          onValueChange={setSelectedFruit}
        >
          <DropdownItemGroupLabel>Fruits</DropdownItemGroupLabel>
          <DropdownRadioItem value='apple'>Apple</DropdownRadioItem>
          <DropdownRadioItem value='banana'>Banana</DropdownRadioItem>
          <DropdownRadioItem value='orange'>Orange</DropdownRadioItem>
          <DropdownRadioItem value='grapes'>Grapes</DropdownRadioItem>
        </DropdownRadioItemGroup>
      </DropdownContent>
    </Dropdown>
  )
}
