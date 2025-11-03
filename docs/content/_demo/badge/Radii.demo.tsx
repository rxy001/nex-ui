import { Badge, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='4' wrap='wrap'>
      <Badge radius='xs' size='lg'>
        Extra Small
      </Badge>
      <Badge radius='sm' size='lg'>
        Small
      </Badge>
      <Badge radius='md' size='lg'>
        Medium
      </Badge>
      <Badge radius='lg' size='lg'>
        Large
      </Badge>
      <Badge radius='full' size='lg'>
        Full
      </Badge>
      <Badge radius='none' size='lg'>
        None
      </Badge>
    </Flex>
  )
}
