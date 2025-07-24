import { Avatar, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Avatar radius='sm' />
      <Avatar radius='md' />
      <Avatar radius='lg' />
      <Avatar radius='xl' />
      <Avatar radius='full' />
      <Avatar radius='none' />
    </Flex>
  )
}
