import { Checkbox, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5' align='center'>
      <Checkbox size='sm'>Small</Checkbox>
      <Checkbox size='md'>Medium</Checkbox>
      <Checkbox size='lg'>Large</Checkbox>
    </Flex>
  )
}
