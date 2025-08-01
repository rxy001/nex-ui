import { Avatar, AvatarGroup } from '@nex-ui/react'

export default function App() {
  return (
    <AvatarGroup max={4} size='lg' radius='full'>
      <Avatar src='https://i.pravatar.cc/150?img=12' />
      <Avatar src='https://i.pravatar.cc/150?img=5' />
      <Avatar src='https://i.pravatar.cc/150?img=31' />
      <Avatar src='https://i.pravatar.cc/150?img=50' />
      <Avatar src='https://i.pravatar.cc/150?img=58' />
    </AvatarGroup>
  )
}
