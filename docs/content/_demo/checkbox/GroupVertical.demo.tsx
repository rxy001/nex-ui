import { Checkbox, CheckboxGroup } from '@nex-ui/react'

export default function App() {
  return (
    <CheckboxGroup orientation='vertical' label='Select your favorite fruits'>
      <Checkbox value='apple'>Apple</Checkbox>
      <Checkbox value='pear'>Pear</Checkbox>
      <Checkbox value='orange'>Orange</Checkbox>
    </CheckboxGroup>
  )
}
