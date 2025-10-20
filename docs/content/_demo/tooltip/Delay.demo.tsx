import { Tooltip, Button } from '@nex-ui/react'

export default function App() {
  return (
    <Tooltip content='Hello, I am a tooltip.' openDelay={500} closeDelay={300}>
      <Button variant='faded'>Delay (open: 500ms, close: 300ms)</Button>
    </Tooltip>
  )
}
