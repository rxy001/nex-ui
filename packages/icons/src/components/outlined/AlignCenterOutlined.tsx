'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlignCenter from '../../svg/outlined/align-center.svg'
import type { IconProps } from '../../types'

export const AlignCenterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AlignCenter, { className: 'align-center-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlignCenterOutlined.displayName = 'AlignCenterOutlined'
