'use client'

import { useSandpack } from '@codesandbox/sandpack-react'
import { CopyOutlined } from '@nex-ui/icons'
import { useClipboard, useEvent } from '@nex-ui/hooks'
import { IconButton } from './IconButton'

export const CopyButton = () => {
  const { copy, copied } = useClipboard()

  const { sandpack } = useSandpack()

  const copyHandler = useEvent(() => {
    const { code } = sandpack.files[sandpack.activeFile]

    copy(code)
  })

  return (
    <IconButton title='Copy Code' onClick={copyHandler} data-copied={copied}>
      <CopyOutlined height={17} width={17} />
    </IconButton>
  )
}
