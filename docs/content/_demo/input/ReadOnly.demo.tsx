import { Input } from '@nex-ui/react'

export default function App() {
  return (
    <Input
      label='Username'
      defaultValue='Nex UI'
      labelPlacement='float-inside'
      size='lg'
      readOnly
    />
  )
}
