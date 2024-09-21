import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Logout from '../../svg/outlined/logout.svg'
import type { IconProps } from '../../types'

export const LogoutOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Logout)
    return <Icon {...props} ref={ref} />
  },
)
