import {
  Popover,
  Box,
  PopoverContent,
  PopoverTrigger,
  Button,
  Flex,
} from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Popover>
        <PopoverTrigger>
          <Button color='green'>Default offset (5)</Button>
        </PopoverTrigger>
        <PopoverContent>
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
      <Popover offset={10}>
        <PopoverTrigger>
          <Button color='green'>Custom offset (10)</Button>
        </PopoverTrigger>
        <PopoverContent>
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
    </Flex>
  )
}
