import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nex UI - React Component Library',
    short_name: 'Nex UI',
    description:
      'Beautiful, modern and reliable React component library with TypeScript support, dark mode, and theme customization.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    orientation: 'portrait',
    scope: '/',
    screenshots: [
      {
        src: '/favicon.ico',
        sizes: '1200x630',
        type: 'image/x-icon',
      },
    ],
  }
}
