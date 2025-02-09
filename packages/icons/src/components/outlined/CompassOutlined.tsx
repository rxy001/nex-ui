'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Compass from '../../svg/outlined/compass.svg'
import type { IconProps } from '../../types'

export const CompassOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Compass, { className: 'compass-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CompassOutlined.displayName = 'CompassOutlined'
