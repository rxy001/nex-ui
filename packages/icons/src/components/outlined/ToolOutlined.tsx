'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tool from '../../svg/outlined/tool.svg'
import type { IconProps } from '../../types'

export const ToolOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Tool, { className: 'tool-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ToolOutlined.displayName = 'ToolOutlined'
