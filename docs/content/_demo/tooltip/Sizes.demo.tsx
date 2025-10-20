import { Tooltip, Button, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='4' wrap='wrap'>
      <Tooltip key='sm' size='sm' content='Hello, I am a tooltip.'>
        <Button variant='faded' sx={{ textTransform: 'capitalize' }}>
          Small
        </Button>
      </Tooltip>
      <Tooltip key='md' size='md' content='Hello, I am a tooltip.'>
        <Button variant='faded' sx={{ textTransform: 'capitalize' }}>
          Medium
        </Button>
      </Tooltip>
      <Tooltip key='lg' size='lg' content='Hello, I am a tooltip.'>
        <Button variant='faded' sx={{ textTransform: 'capitalize' }}>
          Large
        </Button>
      </Tooltip>
    </Flex>
  )
}
