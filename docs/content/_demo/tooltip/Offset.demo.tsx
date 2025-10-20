import { Tooltip, Button, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Tooltip content='Hello, I am a tooltip.'>
        <Button variant='faded'>Default offset (5)</Button>
      </Tooltip>
      <Tooltip content='Hello, I am a tooltip.' offset={10}>
        <Button variant='faded'>Custom offset (10)</Button>
      </Tooltip>
    </Flex>
  )
}
