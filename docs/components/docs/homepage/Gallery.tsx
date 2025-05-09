'use client'

import dynamic from 'next/dynamic'

const ClientGallery = dynamic(
  () => import('./Gallery.client').then((m) => m.ClientGallery),
  { ssr: false },
)

export const Gallery = () => <ClientGallery />
