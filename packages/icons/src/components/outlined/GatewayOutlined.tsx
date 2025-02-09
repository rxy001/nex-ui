'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gateway from '../../svg/outlined/gateway.svg'
import type { IconProps } from '../../types'

export const GatewayOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Gateway, { className: 'gateway-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GatewayOutlined.displayName = 'GatewayOutlined'
