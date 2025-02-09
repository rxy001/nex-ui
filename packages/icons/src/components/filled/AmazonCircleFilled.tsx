'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AmazonCircle from '../../svg/filled/amazon-circle.svg'
import type { IconProps } from '../../types'

export const AmazonCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AmazonCircle, { className: 'amazon-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AmazonCircleFilled.displayName = 'AmazonCircleFilled'
