import { GithubOutlined } from '@nex-ui/icons'
import { Badge, Flex } from '@nex-ui/react'

export default function App() {
  return (
    <Flex gap='4'>
      <Badge startIcon={<GithubOutlined />}>Github</Badge>
      <Badge endIcon={<GithubOutlined />}>Github</Badge>
    </Flex>
  )
}
