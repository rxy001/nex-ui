import { Input, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Input label='Username' labelPlacement='float-inside' size='lg' />
      <Input
        label='Username'
        size='lg'
        labelPlacement='float-inside'
        placeholder='Enter your username'
      />
    </Flex>
  )
}
