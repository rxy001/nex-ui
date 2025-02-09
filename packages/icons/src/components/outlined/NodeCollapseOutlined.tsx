'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import NodeCollapse from '../../svg/outlined/node-collapse.svg'
import type { IconProps } from '../../types'

export const NodeCollapseOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(NodeCollapse, { className: 'node-collapse-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

NodeCollapseOutlined.displayName = 'NodeCollapseOutlined'
