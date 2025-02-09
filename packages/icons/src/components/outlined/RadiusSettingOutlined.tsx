'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusSetting from '../../svg/outlined/radius-setting.svg'
import type { IconProps } from '../../types'

export const RadiusSettingOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RadiusSetting, { className: 'radius-setting-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RadiusSettingOutlined.displayName = 'RadiusSettingOutlined'
