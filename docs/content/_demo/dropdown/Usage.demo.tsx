import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@nex-ui/react'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Apple</DropdownItem>
        <DropdownItem>Banana</DropdownItem>
        <DropdownItem>Orange</DropdownItem>
        <DropdownItem>Grapes</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
