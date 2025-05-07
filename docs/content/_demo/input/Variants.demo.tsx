import { Input, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Input
        label='Variant'
        size='lg'
        labelPlacement='float-inside'
        variant='outlined'
        defaultValue='Outlined'
        color='gray'
      />
      <Input
        label='Variant'
        size='lg'
        labelPlacement='float-inside'
        variant='filled'
        defaultValue='Filled'
        color='gray'
      />
      <Input
        label='Variant'
        size='lg'
        labelPlacement='float-inside'
        variant='underlined'
        defaultValue='Underlined'
        color='gray'
      />
    </Flex>
  )
}
