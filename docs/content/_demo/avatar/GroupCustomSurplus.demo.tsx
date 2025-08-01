'use client'

import { Avatar, AvatarGroup } from '@nex-ui/react'

export default function App() {
  return (
    <AvatarGroup
      max={4}
      size='lg'
      radius='full'
      renderSurplus={(surplus) => {
        return <div style={{ marginLeft: 10 }}>+{surplus}</div>
      }}
    >
      <Avatar src='https://i.pravatar.cc/150?img=8' />
      <Avatar src='https://i.pravatar.cc/150?img=9' />
      <Avatar src='https://i.pravatar.cc/150?img=10' />
      <Avatar src='https://i.pravatar.cc/150?img=11' />
      <Avatar src='https://i.pravatar.cc/150?img=12' />
    </AvatarGroup>
  )
}
