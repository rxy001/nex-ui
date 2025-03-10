import { Flex, Box } from '@nex-ui/react'
import type { ReactNode } from 'react'

function Item({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        px: '4',
        py: '2',
        bg: 'gray.muted',
        borderRadius: 'md',
      }}
      as='div'
    >
      {children}
    </Box>
  )
}

export default function App() {
  return (
    <Flex
      align='flex-end'
      justify='space-evenly'
      sx={{
        h: 120,
      }}
    >
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Flex>
  )
}
