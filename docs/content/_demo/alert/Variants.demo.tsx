import { Flex, Alert } from '@nex-ui/react'

export default function App() {
  return (
    <Flex direction='column' gap='4'>
      <Alert
        variant='faded'
        title='Faded Variant'
        description='This is an example alert description.'
      />
      <Alert
        variant='solid'
        title='Solid Variant'
        description='This is an example alert description.'
      />
      <Alert
        variant='outlined'
        title='Outlined Variant'
        description='This is an example alert description.'
      />
      <Alert
        variant='subtle'
        title='Subtle Variant'
        description='This is an example alert description.'
      />
    </Flex>
  )
}
