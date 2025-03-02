import { Divider, Box, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Box sx={{ maxWidth: '420px' }}>
      <Box
        as='h3'
        sx={{
          fontWeight: 'semibold',
        }}
      >
        Nex UI Components
      </Box>
      <Box
        sx={{
          fs: 'md',
          color: 'gray.secondary',
        }}
        as='p'
      >
        Beautiful, modern and reliable React component library.
      </Box>
      <Divider sx={{ my: '4' }} />
      <Flex
        sx={{
          h: '6',
          fs: 'md',
        }}
        align='center'
      >
        <span>Docs</span>
        <Divider orientation='vertical' sx={{ mx: '4' }} />
        <span>Components</span>
        <Divider orientation='vertical' sx={{ mx: '4' }} />
        <span>Customization</span>
      </Flex>
    </Box>
  )
}
