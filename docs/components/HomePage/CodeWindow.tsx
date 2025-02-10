'use client'

import clsx from 'clsx'
import type { BundledLanguage } from 'shiki'
import { CodeBlock } from '../CodeBlock'

interface CodeBlockProps {
  children: string
  file: string
  className?: string
  lang: BundledLanguage
}

export function CodeWindow({
  lang,
  file,
  className,
  children,
}: CodeBlockProps) {
  return (
    <div className={clsx('x:bg-[#24292e] x:rounded-md x:w-full', className)}>
      <div className="x:text-[#e1e4e8] x:text-center x:py-2 x:font-mono x:text-xs x:relative x:-mb-6">
        {file}
        <div className="x:absolute x:top-2 x:left-4 x:flex x:items-center x:gap-2">
          <div className="x:w-3 x:h-3 x:rounded-full x:bg-red-500" />
          <div className="x:w-3 x:h-3 x:rounded-full x:bg-yellow-500" />
          <div className="x:w-3 x:h-3 x:rounded-full x:bg-green-500" />
        </div>
      </div>
      <CodeBlock lang={lang}>{children}</CodeBlock>
    </div>
  )
}
