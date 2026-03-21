import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Flex,
} from '@nex-ui/react'

const colors = [
  'blue',
  'orange',
  'cyan',
  'gray',
  'red',
  'green',
  'pink',
  'purple',
  'yellow',
] as const

export default function App() {
  return (
    <Flex gap='4' wrap='wrap'>
      {colors.map((color) => (
        <Dropdown key={color}>
          <DropdownTrigger>
            <Button color={color} sx={{ textTransform: 'capitalize' }}>
              {color}
            </Button>
          </DropdownTrigger>
          <DropdownContent color={color}>
            <DropdownItem>Apple</DropdownItem>
            <DropdownItem>Banana</DropdownItem>
            <DropdownItem>Orange</DropdownItem>
            <DropdownItem>Grapes</DropdownItem>
          </DropdownContent>
        </Dropdown>
      ))}
    </Flex>
  )
}
