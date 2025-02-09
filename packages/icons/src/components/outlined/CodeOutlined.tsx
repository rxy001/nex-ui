'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Code from '../../svg/outlined/code.svg'
import type { IconProps } from '../../types'

export const CodeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Code, { className: 'code-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CodeOutlined.displayName = 'CodeOutlined'
