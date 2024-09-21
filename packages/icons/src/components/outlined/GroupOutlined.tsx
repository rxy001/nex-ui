import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Group from '../../svg/outlined/group.svg'
import type { IconProps } from '../../types'

export const GroupOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Group)
    return <Icon {...props} ref={ref} />
  },
)
