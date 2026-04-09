import {
  Dropdown,
  DropdownTrigger,
  Flex,
  Button,
  DropdownContent,
  DropdownItem,
} from '@nex-ui/react'

const variants = ['solid', 'outlined', 'ghost', 'faded'] as const

export default function App() {
  return (
    <Flex gap='5' wrap='wrap'>
      {variants.map((variant) => (
        <Dropdown key={variant}>
          <DropdownTrigger>
            <Button variant={variant} sx={{ textTransform: 'capitalize' }}>
              {variant}
            </Button>
          </DropdownTrigger>
          <DropdownContent variant={variant} color='blue'>
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
