'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Subnode from '../../svg/outlined/subnode.svg'
import type { IconProps } from '../../types'

export const SubnodeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Subnode, { className: 'subnode-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SubnodeOutlined.displayName = 'SubnodeOutlined'
