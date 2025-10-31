import { Tooltip, Button, Flex } from '@nex-ui/react'

const colors = [
  'default',
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
      {colors.map((color) => {
        return (
          <Tooltip key={color} color={color} content='Hello, I am a tooltip.'>
            <Button
              variant='faded'
              color={color === 'default' ? 'gray' : color}
              sx={{ textTransform: 'capitalize' }}
            >
              {color}
            </Button>
          </Tooltip>
        )
      })}
    </Flex>
  )
}
