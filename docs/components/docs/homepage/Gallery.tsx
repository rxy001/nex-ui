'use client'

import dynamic from 'next/dynamic'
import { preload } from 'react-dom'

const ClientGallery = dynamic(
  () => import('./Gallery.client').then((m) => m.ClientGallery),
  { ssr: false },
)

export const Gallery = () => {
  preload('/avatars/avatar-1.jpg', { as: 'image' })
  preload('/avatars/avatar-2.jpg', { as: 'image' })
  preload('/avatars/avatar-3.webp', { as: 'image' })
  preload('/avatars/avatar-4.jpg', { as: 'image' })

  return <ClientGallery />
}
