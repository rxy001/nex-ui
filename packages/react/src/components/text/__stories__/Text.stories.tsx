import { Text } from '../Text'

const meta = {
  title: 'Typography/Text',
  component: Text,
}

export default meta

export function Default() {
  return (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien
      augue. Donec eget nunc a enim efficitur efficitur. Donec sed odio
      suscipit, efficitur nisl in, convallis enim. Donec sed odio suscipit,
      efficitur nisl in, convallis enim.
    </Text>
  )
}

export function Truncate() {
  return (
    <Text truncate maxW='xs'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien
      augue. Donec eget nunc a enim efficitur efficitur. Donec sed odio
      suscipit, efficitur nisl in, convallis enim. Donec sed odio suscipit,
      efficitur nisl in, convallis enim.
    </Text>
  )
}
