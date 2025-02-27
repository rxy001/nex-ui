import { Avatar, Flex } from '@nex-ui/react'

export const RadiusDemo = () => {
  return (
    <Flex gap='5'>
      <Avatar radius='sm' />
      <Avatar radius='md' />
      <Avatar radius='lg' />
      <Avatar radius='full' />
    </Flex>
  )
}
