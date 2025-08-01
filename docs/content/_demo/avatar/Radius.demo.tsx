import { Avatar, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Avatar src='https://i.pravatar.cc/150?img=13' size='lg' radius='sm' />
      <Avatar src='https://i.pravatar.cc/150?img=14' size='lg' radius='md' />
      <Avatar src='https://i.pravatar.cc/150?img=15' size='lg' radius='lg' />
      <Avatar src='https://i.pravatar.cc/150?img=16' size='lg' radius='xl' />
      <Avatar src='https://i.pravatar.cc/150?img=19' size='lg' radius='full' />
      <Avatar src='https://i.pravatar.cc/150?img=20' size='lg' radius='none' />
    </Flex>
  )
}
