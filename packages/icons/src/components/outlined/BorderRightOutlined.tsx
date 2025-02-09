'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderRight from '../../svg/outlined/border-right.svg'
import type { IconProps } from '../../types'

export const BorderRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BorderRight, { className: 'border-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BorderRightOutlined.displayName = 'BorderRightOutlined'
