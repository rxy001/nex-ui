import { Avatar, AvatarGroup } from '@nex-ui/react'

export default function App() {
  return (
    <AvatarGroup size='lg' radius='full' spacing={10}>
      <Avatar src='https://i.pravatar.cc/150?img=59' />
      <Avatar src='https://i.pravatar.cc/150?img=60' />
      <Avatar src='https://i.pravatar.cc/150?img=61' />
      <Avatar src='https://i.pravatar.cc/150?img=62' />
      <Avatar src='https://i.pravatar.cc/150?img=63' />
    </AvatarGroup>
  )
}
