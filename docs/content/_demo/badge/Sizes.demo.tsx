import { Badge, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='4' align='center'>
      <Badge size='xs'>Extra Small</Badge>
      <Badge size='sm'>Small</Badge>
      <Badge size='md'>Medium</Badge>
      <Badge size='lg'>Large</Badge>
    </Flex>
  )
}
