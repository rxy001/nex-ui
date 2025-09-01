import { Flex, Alert } from '@nex-ui/react'

export default function App() {
  return (
    <Flex direction='column' gap='4'>
      <Alert
        radius='none'
        title='None Radius'
        description='This is an example alert description.'
      />
      <Alert
        radius='sm'
        title='Small Radius'
        description='This is an example alert description.'
      />
      <Alert
        radius='md'
        title='Medium Radius'
        description='This is an example alert description.'
      />
      <Alert
        radius='lg'
        title='Large Radius'
        description='This is an example alert description.'
      />
      <Alert
        radius='full'
        title='Full Radius'
        description='This is an example alert description.'
      />
    </Flex>
  )
}
