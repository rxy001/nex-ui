import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownTriggerItem,
  SubDropdown,
  SubDropdownContent,
} from '@nex-ui/react'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>File</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem shortcut='⌘Q'>Open...</DropdownItem>
        <DropdownItem>Open Folder...</DropdownItem>
        <DropdownItem>Open File...</DropdownItem>
        <SubDropdown>
          <DropdownTriggerItem>Open Recent</DropdownTriggerItem>
          <SubDropdownContent>
            <DropdownItem>Project 1</DropdownItem>
            <DropdownItem>Project 2</DropdownItem>
            <DropdownItem>Project 3</DropdownItem>
          </SubDropdownContent>
        </SubDropdown>
      </DropdownContent>
    </Dropdown>
  )
}
