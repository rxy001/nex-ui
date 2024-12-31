import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UserDelete from '../../svg/outlined/user-delete.svg'
import type { IconProps } from '../../types'

export const UserDeleteOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UserDelete, { className: 'user-delete-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UserDeleteOutlined.displayName = 'UserDeleteOutlined'
