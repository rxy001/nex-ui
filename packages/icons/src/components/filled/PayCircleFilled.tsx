'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PayCircle from '../../svg/filled/pay-circle.svg'
import type { IconProps } from '../../types'

export const PayCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PayCircle, { className: 'pay-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PayCircleFilled.displayName = 'PayCircleFilled'
