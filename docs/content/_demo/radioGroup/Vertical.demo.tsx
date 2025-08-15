import { RadioGroup, Radio } from '@nex-ui/react'

export default function App() {
  return (
    <RadioGroup label='Select a fruit' orientation='vertical'>
      <Radio value='apple'>Apple</Radio>
      <Radio value='banana'>Banana</Radio>
      <Radio value='cherry'>Cherry</Radio>
    </RadioGroup>
  )
}
