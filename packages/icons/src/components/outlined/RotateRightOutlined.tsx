'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RotateRight from '../../svg/outlined/rotate-right.svg'
import type { IconProps } from '../../types'

export const RotateRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RotateRight, { className: 'rotate-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RotateRightOutlined.displayName = 'RotateRightOutlined'
