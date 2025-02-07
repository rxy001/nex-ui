'use client'

import clsx from 'clsx'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Pre, Code } from 'nextra/components'
import { Fragment, useState, useEffect } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki'
import type { BundledLanguage } from 'shiki'

interface CodeBlockProps {
  children: string
  lang: BundledLanguage
  file: string
  className?: string
}

export function CodeBlock(props: CodeBlockProps) {
  const [nodes, setNodes] = useState<JSX.Element | null>(null)

  useEffect(() => {
    codeToHast(props.children, {
      lang: props.lang,
      theme: 'github-dark',
    }).then((out) => {
      setNodes(
        <div
          className={clsx(
            'x:bg-[#24292e] x:rounded-md x:lg:w-1/2',
            props.className,
          )}
        >
          <div className="x:text-[#e1e4e8] x:text-center x:py-2 x:font-mono x:text-xs x:relative">
            {props.file}
            <div className="x:absolute x:top-2 x:left-4 x:flex x:items-center x:gap-2">
              <div className="x:w-3 x:h-3 x:rounded-full x:bg-red-500" />
              <div className="x:w-3 x:h-3 x:rounded-full x:bg-yellow-500" />
              <div className="x:w-3 x:h-3 x:rounded-full x:bg-green-500" />
            </div>
          </div>
          <div>
            {toJsxRuntime(out, {
              Fragment,
              jsx,
              jsxs,
              components: {
                // your custom `pre` element
                pre: ({ style: _style, ...p }: any) => (
                  <Pre {...p} className={clsx(p.className, 'pt-2')} />
                ),
                code: (p: any) => <Code {...p} />,
                span: (p) => {
                  if (!p.children) {
                    return <span {...p}> </span>
                  }
                  return <span {...p} />
                },
              },
            })}
          </div>
        </div>,
      )
    })
  }, [props.children, props.className, props.file, props.lang])

  return nodes
}
