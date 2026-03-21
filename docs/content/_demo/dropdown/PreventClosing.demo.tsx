'use client'

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@nex-ui/react'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem
          closeOnSelect={false}
          onClick={() => {
            alert('action')
          }}
        >
          Item 1 (stay open)
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            alert('action')
          }}
        >
          Item 2 (will close)
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
