import { RadioGroup, Radio, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex direction='column' gap='5'>
      <RadioGroup label='Select a fruit' size='sm'>
        <Radio value='apple'>Apple</Radio>
        <Radio value='banana'>Banana</Radio>
        <Radio value='cherry'>Cherry</Radio>
      </RadioGroup>
      <RadioGroup label='Select a fruit' size='md'>
        <Radio value='apple'>Apple</Radio>
        <Radio value='banana'>Banana</Radio>
        <Radio value='cherry'>Cherry</Radio>
      </RadioGroup>
      <RadioGroup label='Select a fruit' size='lg'>
        <Radio value='apple'>Apple</Radio>
        <Radio value='banana'>Banana</Radio>
        <Radio value='cherry'>Cherry</Radio>
      </RadioGroup>
    </Flex>
  )
}
