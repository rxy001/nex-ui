'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Check from '../../svg/outlined/check.svg'
import type { IconProps } from '../../types'

export const CheckOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Check, { className: 'check-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CheckOutlined.displayName = 'CheckOutlined'
