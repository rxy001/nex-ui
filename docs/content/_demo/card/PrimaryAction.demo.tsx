import { Card, CardActionArea, Flex, Box, CardFooter } from '@nex-ui/react'

export default function App() {
  const fruits = [
    {
      name: 'Orange',
      image: '/images/fruit-1.jpeg',
    },
    {
      name: 'Tangerine',
      image: '/images/fruit-2.jpeg',
    },
    {
      name: 'Raspberry',
      image: '/images/fruit-3.jpeg',
    },
    {
      name: 'Lemon',
      image: '/images/fruit-4.jpeg',
    },
  ]

  return (
    <Flex gap='3' wrap='wrap'>
      {fruits.map((fruit) => (
        <Card key={fruit.name}>
          <CardActionArea>
            <Box
              as='img'
              src={fruit.image}
              loading='lazy'
              sx={{
                height: 140,
                objectFit: 'cover',
                width: '100%',
                aspectRatio: '1.2 / 1',
              }}
            />
            <CardFooter>
              <Box as='p' sx={{ fontWeight: 'bold' }}>
                {fruit.name}
              </Box>
            </CardFooter>
          </CardActionArea>
        </Card>
      ))}
    </Flex>
  )
}
