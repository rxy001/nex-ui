'use client'

import clsx from 'clsx'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Pre, Code } from 'nextra/components'
import { Fragment, useState, useLayoutEffect } from 'react'
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

  useLayoutEffect(() => {
    codeToHast(props.children, {
      lang: props.lang,
      theme: 'github-dark',
    }).then((out) => {
      setNodes(
        <div
          className={clsx('bg-[#24292e] rounded-md lg:w-1/2', props.className)}
        >
          <div className="text-[#e1e4e8] text-center py-2 font-mono text-xs relative">
            {props.file}
            <div className="absolute top-2 left-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          <div>
            {toJsxRuntime(out, {
              Fragment,
              jsx,
              jsxs,
              components: {
                // your custom `pre` element
                pre: (p: any) => (
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
