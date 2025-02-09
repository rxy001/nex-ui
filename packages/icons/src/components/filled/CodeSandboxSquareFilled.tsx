'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodeSandboxSquare from '../../svg/filled/code-sandbox-square.svg'
import type { IconProps } from '../../types'

export const CodeSandboxSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(CodeSandboxSquare, {
          className: 'code-sandbox-square-filled',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CodeSandboxSquareFilled.displayName = 'CodeSandboxSquareFilled'
