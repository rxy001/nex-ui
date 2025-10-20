import { Tooltip, Button } from '@nex-ui/react'

export default function App() {
  return (
    <Tooltip content='Hello, I am a tooltip.'>
      <Button variant='faded'>Hover me</Button>
    </Tooltip>
  )
}
