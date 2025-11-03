import { Badge, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='4' wrap='wrap'>
      <Badge variant='solid'>Solid</Badge>
      <Badge variant='outlined'>Outlined</Badge>
      <Badge variant='faded'>Faded</Badge>
      <Badge variant='subtle'>Subtle</Badge>
    </Flex>
  )
}
