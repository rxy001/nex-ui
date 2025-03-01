import { Checkbox, CheckboxGroup, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <CheckboxGroup>
      <Flex direction='column'>
        <Checkbox value='apple'>Apple</Checkbox>
        <Checkbox value='pear'>Pear</Checkbox>
        <Checkbox value='orange'>Orange</Checkbox>
      </Flex>
    </CheckboxGroup>
  )
}
