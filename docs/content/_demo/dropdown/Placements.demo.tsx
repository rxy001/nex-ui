import {
  Button,
  Dropdown,
  Flex,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@nex-ui/react'
import type { DropdownContentProps } from '@nex-ui/react'

export default function App() {
  const renderDropdown = (placement: DropdownContentProps['placement']) => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            size='sm'
            variant='faded'
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {placement}
          </Button>
        </DropdownTrigger>
        <DropdownContent placement={placement}>
          <DropdownItem>Apple</DropdownItem>
          <DropdownItem>Banana</DropdownItem>
          <DropdownItem>Orange</DropdownItem>
          <DropdownItem>Grapes</DropdownItem>
        </DropdownContent>
      </Dropdown>
    )
  }

  return (
    <Flex justify='center'>
      <Flex direction='column' gap='3' sx={{ maxW: 500, flex: 1 }}>
        <Flex gap='3' justify='center'>
          {renderDropdown('top-start')}
          {renderDropdown('top')}
          {renderDropdown('top-end')}
        </Flex>
        <Flex justify='space-between'>
          <Flex direction='column' gap='3'>
            {renderDropdown('left-start')}
            {renderDropdown('left')}
            {renderDropdown('left-end')}
          </Flex>
          <Flex direction='column' gap='3'>
            {renderDropdown('right-start')}
            {renderDropdown('right')}
            {renderDropdown('right-end')}
          </Flex>
        </Flex>
        <Flex gap='3' justify='center'>
          {renderDropdown('bottom-start')}
          {renderDropdown('bottom')}
          {renderDropdown('bottom-end')}
        </Flex>
      </Flex>
    </Flex>
  )
}
