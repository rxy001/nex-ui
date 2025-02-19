import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nex-UI Component Library',
    short_name: 'Nex UI',
    theme_color: '#fff',
    background_color: '#fff',
    display: 'standalone',
  }
}
