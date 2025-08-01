import { Avatar, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5' align='center'>
      <Avatar src='https://i.pravatar.cc/150?img=10' size='sm' />
      <Avatar src='https://i.pravatar.cc/150?img=11' size='md' />
      <Avatar src='https://i.pravatar.cc/150?img=12' size='lg' />
      <Avatar src='https://i.pravatar.cc/150?img=13' size='xl' />
    </Flex>
  )
}
