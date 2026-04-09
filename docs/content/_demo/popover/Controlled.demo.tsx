'use client'

import { useState } from 'react'
import {
  Button,
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nex-ui/react'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button>Click me</Button>
        </PopoverTrigger>
        <PopoverContent placement='top'>
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
      <Box sx={{ mt: '2' }}>Open: {open ? 'Yes' : 'No'}</Box>
    </>
  )
}
