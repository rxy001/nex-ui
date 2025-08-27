import { Button, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Button variant='solid'>Solid</Button>
      <Button variant='outlined'>Outlined</Button>
      <Button variant='ghost'>Ghost</Button>
    </Flex>
  )
}
