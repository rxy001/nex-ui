'use client'

import { Tabs } from 'nextra/components'
import { useMemo, type ReactNode } from 'react'
import { Sandpack } from './Sandpack'

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
    <Tabs items={['Preview', 'Code']}>
      <Tabs.Tab key="preview">{demo}</Tabs.Tab>
      <Tabs.Tab key="code">
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
