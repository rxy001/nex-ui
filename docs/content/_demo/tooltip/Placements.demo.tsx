import { Tooltip, Button, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex justify='center'>
      <Flex direction='column' gap='3' sx={{ maxW: 500, flex: 1 }}>
        <Flex gap='3' justify='center'>
          <Tooltip
            color='default'
            placement='top-start'
            content='Hello, I am a tooltip.'
          >
            <Button size='sm' variant='faded'>
              Top-Start
            </Button>
          </Tooltip>
          <Tooltip
            color='default'
            placement='top'
            content='Hello, I am a tooltip.'
          >
            <Button size='sm' variant='faded'>
              Top
            </Button>
          </Tooltip>
          <Tooltip
            color='default'
            placement='top-end'
            content='Hello, I am a tooltip.'
          >
            <Button size='sm' variant='faded'>
              Top-End
            </Button>
          </Tooltip>
        </Flex>
        <Flex justify='space-between'>
          <Flex direction='column' gap='3'>
            <Tooltip
              color='default'
              placement='left-start'
              content='Hello, I am a tooltip.'
            >
              <Button size='sm' variant='faded'>
                Left-Start
              </Button>
            </Tooltip>
            <Tooltip
              color='default'
              placement='left'
              content='Hello, I am a tooltip.'
            >
              <Button size='sm' variant='faded'>
                Left
              </Button>
            </Tooltip>
            <Tooltip
              color='default'
              placement='left-end'
              content='Hello, I am a tooltip.'
            >
              <Button size='sm' variant='faded'>
                Left-End
              </Button>
            </Tooltip>
          </Flex>
          <Flex direction='column' gap='3'>
            <Tooltip
              color='default'
              placement='right-start'
              content='Hello, I am a tooltip.'
            >
              <Button size='sm' variant='faded'>
                Right-Start
              </Button>
            </Tooltip>
            <Tooltip
              color='default'
              placement='right'
              content='Hello, I am a tooltip.'
            >
              <Button size='sm' variant='faded'>
                Right
              </Button>
            </Tooltip>
            <Tooltip
              color='default'
              placement='right-end'
              content='Hello, I am a tooltip.'
            >
              <Button size='sm' variant='faded'>
                Right-End
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex gap='3' justify='center'>
          <Tooltip
            color='default'
            placement='bottom-start'
            content='Hello, I am a tooltip.'
          >
            <Button size='sm' variant='faded'>
              Bottom-Start
            </Button>
          </Tooltip>
          <Tooltip
            color='default'
            placement='bottom'
            content='Hello, I am a tooltip.'
          >
            <Button size='sm' variant='faded'>
              Bottom
            </Button>
          </Tooltip>
          <Tooltip
            color='default'
            placement='bottom-end'
            content='Hello, I am a tooltip.'
          >
            <Button size='sm' variant='faded'>
              Bottom-End
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  )
}
