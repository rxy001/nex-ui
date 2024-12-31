import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UserAdd from '../../svg/outlined/user-add.svg'
import type { IconProps } from '../../types'

export const UserAddOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UserAdd, { className: 'user-add-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UserAddOutlined.displayName = 'UserAddOutlined'
