'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import InfoCircle from '../../svg/outlined/info-circle.svg'
import type { IconProps } from '../../types'

export const InfoCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(InfoCircle, { className: 'info-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InfoCircleOutlined.displayName = 'InfoCircleOutlined'
