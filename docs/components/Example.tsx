'use client'

import { Tabs } from 'nextra/components'
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Sandpack } from './sandpack'

type ExampleProps = {
  code: string
  demo: ReactNode
  showReportBug?: boolean
  showCopyCode?: boolean
  showOpenInCodeSandbox?: boolean
}

export const Example = ({
  code,
  demo,
  showCopyCode,
  showOpenInCodeSandbox,
  showReportBug,
}: ExampleProps) => {
  const files = useMemo(
    () => ({
      '/App.tsx': code,
    }),
    [code],
  )

  return (
    <Tabs items={['Preview', 'Code']} className='x:border-none!'>
      <Tabs.Tab
        key='preview'
        className='x:rounded-md x:border-1 x:py-6 x:px-4 x:border-gray-200 x:dark:border-gray-800 x:overflow-auto'
      >
        {demo}
      </Tabs.Tab>
      <Tabs.Tab key='code' className='x:rounded-md'>
        <Sandpack
          files={files}
          showReportBug={showReportBug}
          showCopyCode={showCopyCode}
          showOpenInCodeSandbox={showOpenInCodeSandbox}
        />
      </Tabs.Tab>
    </Tabs>
  )
}
