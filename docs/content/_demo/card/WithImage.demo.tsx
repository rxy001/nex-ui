import { Box, Card, CardBody, CardHeader } from '@nex-ui/react'

export default function App() {
  return (
    <Card>
      <CardHeader
        title='Daily Mix'
        subtitle='12 Tracks'
        slotProps={{
          title: {
            sx: {
              fontWeight: 'bold',
            },
          },
        }}
      />
      <CardBody
        sx={{
          pt: 0,
        }}
      >
        <Box
          sx={{
            fontWeight: 'bold',
          }}
        >
          Frontend Radio
        </Box>
        <Box
          as='img'
          src='/images/card-cover.jpeg'
          sx={{
            borderRadius: 'lg',
            mt: '2',
            w: 270,
          }}
        />
      </CardBody>
    </Card>
  )
}
