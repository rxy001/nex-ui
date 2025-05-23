import { Input, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5' wrap='wrap'>
      <Input
        label='Color'
        labelPlacement='float-inside'
        variant='filled'
        size='lg'
        color='blue'
        defaultValue='blue'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='cyan'
        defaultValue='cyan'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='gray'
        defaultValue='gray'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='green'
        defaultValue='green'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='orange'
        defaultValue='orange'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='pink'
        defaultValue='pink'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='purple'
        defaultValue='purple'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='yellow'
        defaultValue='yellow'
      />
      <Input
        label='Color'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        color='red'
        defaultValue='red'
      />
    </Flex>
  )
}
