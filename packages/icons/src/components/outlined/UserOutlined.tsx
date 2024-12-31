import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import User from '../../svg/outlined/user.svg'
import type { IconProps } from '../../types'

export const UserOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(User, { className: 'user-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UserOutlined.displayName = 'UserOutlined'
