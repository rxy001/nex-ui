import { RadioGroup, Radio } from '@nex-ui/react'

export default function App() {
  return (
    <RadioGroup label='Select a color'>
      <Radio value='red' color='red'>
        Red
      </Radio>
      <Radio value='green' color='green'>
        Green
      </Radio>
      <Radio value='blue' color='blue'>
        Blue
      </Radio>
      <Radio value='yellow' color='yellow'>
        Yellow
      </Radio>
      <Radio value='purple' color='purple'>
        Purple
      </Radio>
      <Radio value='orange' color='orange'>
        Orange
      </Radio>
      <Radio value='pink' color='pink'>
        Pink
      </Radio>
      <Radio value='cyan' color='cyan'>
        Cyan
      </Radio>
      <Radio value='gray' color='gray'>
        Gray
      </Radio>
    </RadioGroup>
  )
}
