'use client'

import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import { useSandpack } from './useSandpack'
import { SandpackCodeViewer } from './SandpackCodeViewer'
import { CopyButton } from './CopyButton'
import { CodeSandboxButton } from './CodeSandboxButton'
import { BugReportButton } from './BugReportButton'
import type { ReactNode } from 'react'
import type { UseSandpackProps } from './useSandpack'

type SandpackProps = UseSandpackProps & {
  showPreview?: boolean
  children?: ReactNode
  showEditor?: boolean
  showOpenInCodeSandbox?: boolean
  showReportBug?: boolean
  showCopyCode?: boolean
}

export const Sandpack = ({
  files: filesProp,
  template,
  children,
  showEditor = true,
  showPreview = false,
  showOpenInCodeSandbox = true,
  showReportBug = true,
  showCopyCode = true,
}: SandpackProps) => {
  const { files, customSetup, sandpackTemplate } = useSandpack({
    files: filesProp,
    template,
  })

  return (
    <SandpackProvider
      files={files}
      customSetup={customSetup}
      template={sandpackTemplate}
      theme='dark'
    >
      <SandpackLayout className='x:border-none! x:bg-transparent!'>
        <div className='x:flex x:w-full x:flex-col'>
          <div>{showPreview ? <SandpackPreview /> : children}</div>
          <div className='x:group x:h-auto x:relative'>
            {showEditor && <SandpackCodeViewer />}
            <div className='x:hidden x:md:flex x:z-20 x:opacity-0 x:group-hover:opacity-100 x:transition-opacity x:absolute x:gap-1 x:right-2 x:top-2 x:items-center x:justify-center x:bg-code-background'>
              {showCopyCode && <CopyButton />}
              {showOpenInCodeSandbox && <CodeSandboxButton />}
              {showReportBug && <BugReportButton />}
            </div>
          </div>
        </div>
      </SandpackLayout>
    </SandpackProvider>
  )
}
