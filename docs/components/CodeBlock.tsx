'use client'

import clsx from 'clsx'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Pre, Code } from 'nextra/components'
import { Fragment, useState, useEffect, JSX } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle-web.mjs'
import type { BundledLanguage } from 'shiki'

interface CodeBlockProps {
  children: string
  lang: BundledLanguage
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
        toJsxRuntime(out, {
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
        }),
      )
    })
  }, [props.children, props.className, props.lang])

  return nodes
}
