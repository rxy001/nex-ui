import { Avatar, Flex } from '@nex-ui/react'
import { UserOutlined } from '@nex-ui/icons'

export const UseageDemo = () => {
  return (
    <Flex gap='5'>
      <Avatar
        src='https://github.com/rxy001/nex-ui/blob/temp/docs/public/images/avatar_1.jpeg?raw=true'
        alt='Avatar'
      />
      <Avatar>XY</Avatar>
      <Avatar>
        <UserOutlined />
      </Avatar>
    </Flex>
  )
}
