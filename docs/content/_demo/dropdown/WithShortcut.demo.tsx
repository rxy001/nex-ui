import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownContent,
  DropdownItem,
  DropdownDivider,
} from '@nex-ui/react'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Edit</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem shortcut='⌘Z'>Undo</DropdownItem>
        <DropdownItem shortcut='⇧⌘Z'>Redo</DropdownItem>
        <DropdownDivider />
        <DropdownItem shortcut='⌘X'>Cut</DropdownItem>
        <DropdownItem shortcut='⌘C'>Copy</DropdownItem>
        <DropdownItem shortcut='⌘V'>Paste</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
