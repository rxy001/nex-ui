import { Button, Box, Flex } from '@nex-ui/react'

function App() {
  return (
    <Flex
      as='main'
      gap='15'
      align='center'
      direction='column'
      sx={{ pt: '150px' }}
    >
      <Box as='h1' sx={{ mb: 2 }}>
        Nex UI - Vite example in TypeScript
      </Box>
      <Flex gap='10'>
        <Button target='_blank' href='https://nex-ui-docs.vercel.app/'>
          Document
        </Button>
        <Button target='_blank' href='https://github.com/rxy001/nex-ui'>
          Github
        </Button>
      </Flex>
    </Flex>
  )
}

export default App
