import { Avatar, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Avatar src='/avatar.png' alt='Avatar'>
        X
      </Avatar>
      <Avatar src='/avatar.png' alt='Avatar' />
    </Flex>
  )
}
