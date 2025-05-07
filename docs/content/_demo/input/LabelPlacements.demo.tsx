import { Input, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex direction='column' gap='5'>
      <Flex gap='5'>
        <Input label='Float Inside' size='lg' labelPlacement='float-inside' />
        <Input label='Inside' size='lg' labelPlacement='inside' />
      </Flex>
      <Flex gap='5'>
        <Input label='Float Outside' size='lg' labelPlacement='float-outside' />
        <Input label='Outside' size='lg' labelPlacement='outside' />
      </Flex>
    </Flex>
  )
}
