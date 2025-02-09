'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlipaySquare from '../../svg/filled/alipay-square.svg'
import type { IconProps } from '../../types'

export const AlipaySquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AlipaySquare, { className: 'alipay-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlipaySquareFilled.displayName = 'AlipaySquareFilled'
