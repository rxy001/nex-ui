import { Input, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Input
        label='Amount'
        prefix='$'
        labelPlacement='float-inside'
        size='lg'
      />
      <Input
        label='Weight'
        suffix='KG'
        labelPlacement='float-inside'
        size='lg'
      />
      <Input
        label='Website'
        labelPlacement='float-inside'
        size='lg'
        prefix='https://'
        suffix='.com'
      />
    </Flex>
  )
}
