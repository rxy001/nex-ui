'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Cloud from '../../svg/filled/cloud.svg'
import type { IconProps } from '../../types'

export const CloudFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Cloud, { className: 'cloud-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloudFilled.displayName = 'CloudFilled'
