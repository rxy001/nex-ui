import { Flex, Switch } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='5' wrap='wrap'>
      <Switch color='gray' size='lg' defaultChecked />
      <Switch color='blue' size='lg' defaultChecked />
      <Switch color='cyan' size='lg' defaultChecked />
      <Switch color='orange' size='lg' defaultChecked />
      <Switch color='red' size='lg' defaultChecked />
      <Switch color='green' size='lg' defaultChecked />
      <Switch color='pink' size='lg' defaultChecked />
      <Switch color='purple' size='lg' defaultChecked />
      <Switch color='yellow' size='lg' defaultChecked />
    </Flex>
  )
}
