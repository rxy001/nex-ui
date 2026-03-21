import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownContent,
  DropdownItemGroup,
  DropdownItemGroupLabel,
  DropdownItem,
  DropdownDivider,
} from '@nex-ui/react'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItemGroup>
          <DropdownItemGroupLabel>Fruits</DropdownItemGroupLabel>
          <DropdownItem>Apple</DropdownItem>
          <DropdownItem>Banana</DropdownItem>
          <DropdownItem>Orange</DropdownItem>
          <DropdownItem>Grapes</DropdownItem>
        </DropdownItemGroup>
        <DropdownDivider />
        <DropdownItemGroup>
          <DropdownItemGroupLabel>Vegetables</DropdownItemGroupLabel>
          <DropdownItem>Carrot</DropdownItem>
          <DropdownItem>Broccoli</DropdownItem>
          <DropdownItem>Spinach</DropdownItem>
        </DropdownItemGroup>
      </DropdownContent>
    </Dropdown>
  )
}
