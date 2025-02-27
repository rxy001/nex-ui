import { Avatar, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Avatar src='https://nex-ui.com/avatar.png' alt='Avatar'>
        X
      </Avatar>
      <Avatar src='https://nex-ui.com/avatar.png' alt='Avatar' />
    </Flex>
  )
}
