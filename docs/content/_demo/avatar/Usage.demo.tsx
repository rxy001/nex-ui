import { Avatar, Flex } from '@nex-ui/react'
import { UserOutlined } from '@nex-ui/icons'

export default function App() {
  return (
    <Flex gap='5'>
      <Avatar
        src='https://avatars.githubusercontent.com/u/25546323?v=4'
        alt='Avatar'
      />
      <Avatar>XY</Avatar>
      <Avatar>
        <UserOutlined />
      </Avatar>
    </Flex>
  )
}
