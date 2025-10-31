import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Box,
} from '@nex-ui/react'

export default function App() {
  return (
    <Popover
      motionProps={{
        variants: {
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.1,
              ease: 'easeIn',
            },
          },
          hidden: {
            opacity: 0,
            scale: 0.9,
            transition: {
              duration: 0.1,
              ease: 'easeOut',
            },
          },
        },
      }}
    >
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
