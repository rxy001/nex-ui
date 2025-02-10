import { Button, Flex } from '@nex-ui/react'

export const VariantsDemo = () => {
  return (
    <Flex gap="5">
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button>
    </Flex>
  )
}
