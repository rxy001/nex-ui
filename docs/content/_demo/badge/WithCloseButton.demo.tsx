'use client'

import { Badge } from '@nex-ui/react'

export default function App() {
  return (
    <Badge
      closable
      onClose={() => {
        alert('Close')
      }}
    >
      Badge
    </Badge>
  )
}
