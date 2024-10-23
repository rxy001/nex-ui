import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Logout from '../../svg/outlined/logout.svg'
import type { IconProps } from '../../types'

export const LogoutOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Logout, { className: 'logout-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
