import Link from 'next/link'
import { Button, Box, Flex } from '@nex-ui/react'

export default function Home() {
  return (
    <div>
      <Flex
        as='main'
        direction='column'
        gap='15'
        align='center'
        sx={{ pt: '150px' }}
      >
        <Box as='h1' sx={{ mb: 2 }}>
          Nex UI - Next.js App Router example in TypeScript
        </Box>
        <Flex gap='10'>
          <Button
            as={Link}
            target='_blank'
            href='https://nex-ui-docs.vercel.app/'
          >
            Document
          </Button>
          <Button
            as={Link}
            target='_blank'
            href='https://github.com/rxy001/nex-ui'
          >
            Github
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}
