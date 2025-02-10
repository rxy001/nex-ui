import { useSandpack } from '@codesandbox/sandpack-react'
import { CopyIcon } from 'nextra/icons'
import { useClipboard, useEvent } from '@nex-ui/hooks'
import { IconButton } from './IconButton'

export const CopyButton = () => {
  const { copy } = useClipboard()

  const { sandpack } = useSandpack()

  const copyHandler = useEvent(() => {
    const { code } = sandpack.files[sandpack.activeFile]

    copy(code)
  })

  return (
    <IconButton title="Copy Code" onClick={copyHandler}>
      <CopyIcon height={17} width={17} />
    </IconButton>
  )
}
