import { Button, Flex } from '@nex-ui/react'

export const SizesDemo = () => {
  return (
    <Flex gap='5' align='center'>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
    </Flex>
  )
}
