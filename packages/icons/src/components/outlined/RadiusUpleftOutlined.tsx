'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusUpleft from '../../svg/outlined/radius-upleft.svg'
import type { IconProps } from '../../types'

export const RadiusUpleftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RadiusUpleft, { className: 'radius-upleft-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RadiusUpleftOutlined.displayName = 'RadiusUpleftOutlined'
