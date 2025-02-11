import { Button, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap="5">
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="full">Full</Button>
    </Flex>
  )
}
