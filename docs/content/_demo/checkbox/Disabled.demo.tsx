import { Checkbox, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5'>
      <Checkbox disabled>Option</Checkbox>
      <Checkbox disabled defaultChecked>
        Option
      </Checkbox>
    </Flex>
  )
}
