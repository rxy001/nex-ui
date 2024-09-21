import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Setting from '../../svg/filled/setting.svg'
import type { IconProps } from '../../types'

export const SettingFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Setting)
    return <Icon {...props} ref={ref} />
  },
)
