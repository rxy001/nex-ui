'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { CodeBlock } from '../../CodeBlock'
import type { BundledLanguage } from 'shiki'

interface CodeBlockProps {
  children: string
  file: string
  className?: string
  lang: BundledLanguage
  codeClassName?: string
}

export function CodeWindow({
  lang,
  file,
  className,
  children,
  codeClassName,
}: CodeBlockProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={clsx('x:bg-[#111113] x:rounded-md x:w-full', className)}>
      <div
        className={`x:text-[#e1e4e8] x:h-8 x:text-center x:py-2 x:font-mono x:text-xs x:relative x:-mb-6 ${loaded ? 'x:block' : 'x:hidden'}`}
      >
        {file}
        <div className='x:absolute x:top-2 x:left-4 x:flex x:items-center x:gap-2'>
          <div className='x:w-3 x:h-3 x:rounded-full x:bg-red-500' />
          <div className='x:w-3 x:h-3 x:rounded-full x:bg-yellow-500' />
          <div className='x:w-3 x:h-3 x:rounded-full x:bg-green-500' />
        </div>
      </div>
      <CodeBlock
        lang={lang}
        className={clsx('x:pt-2', codeClassName)}
        onLoaded={() => {
          setLoaded(true)
        }}
      >
        {children}
      </CodeBlock>
    </div>
  )
}
