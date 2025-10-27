import { Tooltip, Button, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Tooltip content='Hello, I am a tooltip.' interactive>
        <Button variant='faded'>Interactive: true</Button>
      </Tooltip>
      <Tooltip content='Hello, I am a tooltip.' interactive={false}>
        <Button variant='faded'>Interactive: false</Button>
      </Tooltip>
    </Flex>
  )
}
