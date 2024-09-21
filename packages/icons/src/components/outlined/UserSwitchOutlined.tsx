import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UserSwitch from '../../svg/outlined/user-switch.svg'
import type { IconProps } from '../../types'

export const UserSwitchOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UserSwitch)
    return <Icon {...props} ref={ref} />
  },
)
