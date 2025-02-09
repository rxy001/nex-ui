'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wifi from '../../svg/outlined/wifi.svg'
import type { IconProps } from '../../types'

export const WifiOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Wifi, { className: 'wifi-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WifiOutlined.displayName = 'WifiOutlined'
