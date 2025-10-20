'use client'

import { useState } from 'react'
import { Tooltip, Button, Box } from '@nex-ui/react'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip
        content='Hello, I am a tooltip.'
        open={open}
        onOpenChange={setOpen}
        placement='top'
      >
        <Button variant='faded'>Hover me</Button>
      </Tooltip>
      <Box sx={{ mt: '2' }}>Open: {open ? 'Yes' : 'No'}</Box>
    </>
  )
}
