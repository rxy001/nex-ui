'use client'

import {
  Button,
  Dropdown,
  DropdownCheckboxItem,
  DropdownCheckboxItemGroup,
  DropdownContent,
  DropdownItemGroupLabel,
  DropdownTrigger,
} from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'auto-update',
    'dark-mode',
  ])
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Features</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownCheckboxItemGroup
          value={selectedFeatures}
          onValueChange={setSelectedFeatures}
        >
          <DropdownItemGroupLabel>Features</DropdownItemGroupLabel>
          <DropdownCheckboxItem value='auto-update'>
            Auto-update
          </DropdownCheckboxItem>
          <DropdownCheckboxItem value='multi-language'>
            Multi-language
          </DropdownCheckboxItem>
          <DropdownCheckboxItem value='dark-mode'>
            Dark mode
          </DropdownCheckboxItem>
          <DropdownCheckboxItem value='offline-support'>
            Offline support
          </DropdownCheckboxItem>
        </DropdownCheckboxItemGroup>
      </DropdownContent>
    </Dropdown>
  )
}
