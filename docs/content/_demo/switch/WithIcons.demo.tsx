import { Switch } from '@nex-ui/react'
import { SunFilled, MoonFilled } from '@nex-ui/icons'

export default function App() {
  return (
    <Switch
      startIcon={<SunFilled />}
      endIcon={<MoonFilled />}
      size='lg'
      color='green'
      defaultChecked
    />
  )
}
