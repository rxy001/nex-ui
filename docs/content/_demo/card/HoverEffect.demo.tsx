import { Card, Flex, Box, CardHeader } from '@nex-ui/react'

export default function App() {
  const playlist = [
    {
      cover: '/images/playlist-cover-1.jpg',
      name: 'Country Music',
      author: 'Gabriel',
    },
    {
      cover: '/images/playlist-cover-2.jpg',
      name: 'Trip Hop',
      author: 'Ava',
    },
    {
      cover: '/images/playlist-cover-3.jpg',
      name: 'Classical Music',
      author: 'Nina',
    },
    {
      cover: '/images/playlist-cover-4.jpg',
      name: 'Disc Jockey',
      author: 'David',
    },
  ]

  return (
    <Flex gap='3' wrap='wrap'>
      {playlist.map(({ name, cover, author }) => (
        <Card key={name} hoverable>
          <Box
            as='img'
            src={cover}
            loading='lazy'
            sx={{
              w: '100%',
              h: '200px',
              objectFit: 'cover',
              aspectRatio: '1 / 1.19',
            }}
          />
          <CardHeader title={name} subtitle={author} />
        </Card>
      ))}
    </Flex>
  )
}
