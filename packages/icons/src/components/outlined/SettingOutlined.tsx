import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Setting from '../../svg/outlined/setting.svg'
import type { IconProps } from '../../types'

export const SettingOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Setting, { className: 'setting-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
