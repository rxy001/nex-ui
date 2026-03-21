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
      <DropdownContent maxHeight={200}>
        <DropdownItem>New File</DropdownItem>
        <DropdownItem>New Folder</DropdownItem>
        <DropdownItem>Open...</DropdownItem>
        <DropdownItem>Open Recent</DropdownItem>
        <DropdownItem>Save</DropdownItem>
        <DropdownItem>Save As...</DropdownItem>
        <DropdownItem>Save All</DropdownItem>
        <DropdownItem>Export</DropdownItem>
        <DropdownItem>Import</DropdownItem>
        <DropdownItem>Print</DropdownItem>
        <DropdownItem>Share</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
