'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderVerticle from '../../svg/outlined/border-verticle.svg'
import type { IconProps } from '../../types'

export const BorderVerticleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(BorderVerticle, { className: 'border-verticle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BorderVerticleOutlined.displayName = 'BorderVerticleOutlined'
