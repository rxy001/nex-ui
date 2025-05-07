import { UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react'
import { CodeSandboxOutlined } from '@nex-ui/icons'
import { IconButton } from './IconButton'

export const CodeSandboxButton = () => {
  return (
    <IconButton title='Open in CodeSandbox' as='span'>
      <UnstyledOpenInCodeSandboxButton className='x:size-full x:flex x:justify-center x:items-center x:bg-none x:border-none x:p-0 x:m-0 x:outline-0 x:cursor-pointer'>
        <CodeSandboxOutlined />
      </UnstyledOpenInCodeSandboxButton>
    </IconButton>
  )
}
