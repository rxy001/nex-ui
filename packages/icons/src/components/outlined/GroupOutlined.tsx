import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Group from '../../svg/outlined/group.svg'
import type { IconProps } from '../../types'

export const GroupOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Group, { className: 'group-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
