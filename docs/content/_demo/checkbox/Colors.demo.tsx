import { Checkbox, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5' wrap='wrap'>
      <Checkbox color='blue' defaultChecked>
        Blue
      </Checkbox>
      <Checkbox color='cyan' defaultChecked>
        Cyan
      </Checkbox>
      <Checkbox color='gray' defaultChecked>
        Gray
      </Checkbox>
      <Checkbox color='orange' defaultChecked>
        Orange
      </Checkbox>
      <Checkbox color='red' defaultChecked>
        Red
      </Checkbox>
      <Checkbox color='green' defaultChecked>
        Green
      </Checkbox>
      <Checkbox color='pink' defaultChecked>
        Pink
      </Checkbox>
      <Checkbox color='purple' defaultChecked>
        Purple
      </Checkbox>
      <Checkbox color='yellow' defaultChecked>
        Yellow
      </Checkbox>
    </Flex>
  )
}
