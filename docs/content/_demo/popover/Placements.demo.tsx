import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Flex,
  Box,
} from '@nex-ui/react'
import type { PopoverContentProps } from '@nex-ui/react'

export default function App() {
  const renderPopover = (placement: PopoverContentProps['placement']) => {
    return (
      <Popover>
        <PopoverTrigger>
          <Button
            size='sm'
            variant='faded'
            color='purple'
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {placement}
          </Button>
        </PopoverTrigger>
        <PopoverContent placement={placement}>
          <Box
            sx={{
              fontWeight: 'bold',
            }}
          >
            Popover Content
          </Box>
          <Box
            sx={{
              fs: 'sm',
            }}
          >
            This is the popover content
          </Box>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Flex justify='center'>
      <Flex direction='column' gap='3' sx={{ maxW: 500, flex: 1 }}>
        <Flex gap='3' justify='center'>
          {renderPopover('top-start')}
          {renderPopover('top')}
          {renderPopover('top-end')}
        </Flex>
        <Flex justify='space-between'>
          <Flex direction='column' gap='3'>
            {renderPopover('left-start')}
            {renderPopover('left')}
            {renderPopover('left-end')}
          </Flex>
          <Flex direction='column' gap='3'>
            {renderPopover('right-start')}
            {renderPopover('right')}
            {renderPopover('right-end')}
          </Flex>
        </Flex>
        <Flex gap='3' justify='center'>
          {renderPopover('bottom-start')}
          {renderPopover('bottom')}
          {renderPopover('bottom-end')}
        </Flex>
      </Flex>
    </Flex>
  )
}
