'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DotNet from '../../svg/outlined/dot-net.svg'
import type { IconProps } from '../../types'

export const DotNetOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DotNet, { className: 'dot-net-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DotNetOutlined.displayName = 'DotNetOutlined'
