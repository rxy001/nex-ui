'use client'

import { Alert, Button } from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [open, setOpen] = useState(true)

  return open ? (
    <Alert
      closable
      title='Closable Alert'
      description='This is an example alert description.'
      onClose={() => setOpen(false)}
    />
  ) : (
    <Button onClick={() => setOpen(true)}>Open Alert</Button>
  )
}
