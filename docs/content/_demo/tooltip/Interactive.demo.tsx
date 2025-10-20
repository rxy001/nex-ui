import { Tooltip, Button, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Tooltip content='Hello, I am a tooltip.' interactive={false}>
        <Button variant='faded'>Hover me</Button>
      </Tooltip>
    </Flex>
  )
}
