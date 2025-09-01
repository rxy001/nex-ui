import { Flex, Alert } from '@nex-ui/react'

export default function App() {
  return (
    <Flex direction='column' gap='4'>
      <Alert
        status='error'
        title='Error Status'
        description='This is an example alert description.'
      />
      <Alert
        status='success'
        title='Success Status'
        description='This is an example alert description.'
      />
      <Alert
        status='warning'
        title='Warning Status'
        description='This is an example alert description.'
      />
      <Alert
        status='info'
        title='Info Status'
        description='This is an example alert description.'
      />
    </Flex>
  )
}
