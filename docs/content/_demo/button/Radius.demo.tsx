import { Button, Flex } from '@nex-ui/react'

export const RadiusDemo = () => {
  return (
    <Flex gap='5' wrap='wrap'>
      <Button radius='sm'>Small</Button>
      <Button radius='md'>Medium</Button>
      <Button radius='lg'>Large</Button>
      <Button radius='full'>Full</Button>
    </Flex>
  )
}
