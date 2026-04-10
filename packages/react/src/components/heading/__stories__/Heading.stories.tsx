import { Flex } from '../../flex'
import { Heading } from '../Heading'

const meta = {
  title: 'Typography/Heading',
  component: Heading,
}

export default meta

export function Default() {
  return (
    <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Heading>
  )
}

export function Sizes() {
  return (
    <Flex gap='5' direction='column'>
      <Heading size='xs'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
      <Heading size='sm'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
      <Heading size='md'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
      <Heading size='lg'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
      <Heading size='xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
      <Heading size='2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
      <Heading size='3xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
      <Heading size='4xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Heading>
    </Flex>
  )
}

export function Truncate() {
  return (
    <Heading truncate maxW='xs'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Heading>
  )
}
