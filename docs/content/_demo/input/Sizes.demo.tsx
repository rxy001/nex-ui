import { Input, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Flex gap='5' direction='column'>
        <Input
          label='Size'
          size='sm'
          labelPlacement='float-inside'
          variant='outlined'
          defaultValue='sm'
        />
        <Input
          label='Size'
          size='md'
          labelPlacement='float-inside'
          variant='outlined'
          defaultValue='md'
        />
        <Input
          label='Size'
          size='lg'
          labelPlacement='float-inside'
          variant='outlined'
          defaultValue='lg'
        />
      </Flex>
      <Flex gap='5' direction='column'>
        <Input
          label='Size'
          size='sm'
          labelPlacement='float-inside'
          variant='filled'
          defaultValue='sm'
          color='gray'
        />
        <Input
          label='Size'
          size='md'
          labelPlacement='float-inside'
          variant='filled'
          defaultValue='md'
          color='gray'
        />
        <Input
          label='Size'
          size='lg'
          labelPlacement='float-inside'
          variant='filled'
          defaultValue='lg'
          color='gray'
        />
      </Flex>
      <Flex gap='5' direction='column'>
        <Input
          label='Size'
          size='sm'
          labelPlacement='float-inside'
          variant='underlined'
          defaultValue='sm'
          color='gray'
        />
        <Input
          label='Size'
          size='md'
          labelPlacement='float-inside'
          variant='underlined'
          defaultValue='md'
          color='gray'
        />
        <Input
          label='Size'
          size='lg'
          labelPlacement='float-inside'
          variant='underlined'
          defaultValue='lg'
          color='gray'
        />
      </Flex>
    </Flex>
  )
}
