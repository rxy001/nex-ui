import {
  Popover,
  Button,
  PopoverContent,
  PopoverTrigger,
  Box,
} from '@nex-ui/react'

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Click me</Button>
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
  )
}
