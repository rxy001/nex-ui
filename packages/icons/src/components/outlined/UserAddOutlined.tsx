import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UserAdd from '../../svg/outlined/user-add.svg'
import type { IconProps } from '../../types'

export const UserAddOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UserAdd)
    return <Icon {...props} ref={ref} />
  },
)
