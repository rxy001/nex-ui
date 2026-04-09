import {
  Flex,
  Box,
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
} from '@nex-ui/react'

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
    <Flex gap='5' wrap='wrap'>
      {colors.map((color) => {
        return (
          <Popover key={color}>
            <PopoverTrigger>
              <Button
                color={color === 'default' ? 'gray' : color}
                sx={{ textTransform: 'capitalize' }}
              >
                {color}
              </Button>
            </PopoverTrigger>
            <PopoverContent color={color}>
              <Box
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Popover Content
              </Box>
              <Box
                sx={{
                  fs: 'xs',
                }}
              >
                This is the popover content
              </Box>
            </PopoverContent>
          </Popover>
        )
      })}
    </Flex>
  )
}
