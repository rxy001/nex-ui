import { useMemo } from 'react'
import {
  useSandpack,
  useActiveCode,
  SandpackStack,
} from '@codesandbox/sandpack-react'
import type { BundledLanguage } from 'shiki'
import { CodeBlock } from '../CodeBlock'

export const SandpackCodeViewer = () => {
  const { sandpack } = useSandpack()
  const { code } = useActiveCode()
  const { activeFile } = sandpack

  const lang = useMemo(
    () => activeFile.split('.').pop() as BundledLanguage,
    [activeFile],
  )

  return (
    <SandpackStack className='x:bg-transparent!'>
      <div className='sp-code-viewer max-h-[600px] overflow-y-scroll'>
        <CodeBlock lang={lang}>{code}</CodeBlock>
      </div>
    </SandpackStack>
  )
}
