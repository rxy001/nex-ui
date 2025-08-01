import { Avatar, AvatarGroup } from '@nex-ui/react'

export default function App() {
  return (
    <AvatarGroup total={10} size='lg' radius='full'>
      <Avatar src='https://i.pravatar.cc/150?img=53' />
      <Avatar src='https://i.pravatar.cc/150?img=54' />
      <Avatar src='https://i.pravatar.cc/150?img=55' />
      <Avatar src='https://i.pravatar.cc/150?img=56' />
      <Avatar src='https://i.pravatar.cc/150?img=57' />
    </AvatarGroup>
  )
}
