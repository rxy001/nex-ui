'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AmazonSquare from '../../svg/filled/amazon-square.svg'
import type { IconProps } from '../../types'

export const AmazonSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AmazonSquare, { className: 'amazon-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AmazonSquareFilled.displayName = 'AmazonSquareFilled'
