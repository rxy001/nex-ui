import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UserSwitch from '../../svg/outlined/user-switch.svg'
import type { IconProps } from '../../types'

export const UserSwitchOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UserSwitch, { className: 'user-switch-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
