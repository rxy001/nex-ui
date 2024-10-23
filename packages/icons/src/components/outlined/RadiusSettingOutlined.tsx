import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusSetting from '../../svg/outlined/radius-setting.svg'
import type { IconProps } from '../../types'

export const RadiusSettingOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RadiusSetting, {
      className: 'radius-setting-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
