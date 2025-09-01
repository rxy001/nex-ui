import { Alert, Button } from '@nex-ui/react'

export default function App() {
  return (
    <Alert
      title='Alert Title'
      description='This is an example alert description.'
      action={
        <Button size='sm' variant='ghost'>
          Action
        </Button>
      }
    />
  )
}
