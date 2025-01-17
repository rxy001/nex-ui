import type { BundledLanguage } from 'shiki'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Pre, Code } from 'nextra/components'
import { Fragment, useState, useLayoutEffect } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki'

interface CodeBlockProps {
  children: string
  lang: BundledLanguage
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
        <div className={props.className}>
          {toJsxRuntime(out, {
            Fragment,
            jsx,
            jsxs,
            components: {
              // your custom `pre` element
              pre: (p: any) => <Pre {...p} />,
              code: (p: any) => <Code {...p} />,
            },
          })}
        </div>,
      )
    })
  }, [props.children, props.className, props.lang])

  return nodes
}
