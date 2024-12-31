import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Team from '../../svg/outlined/team.svg'
import type { IconProps } from '../../types'

export const TeamOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Team, { className: 'team-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TeamOutlined.displayName = 'TeamOutlined'
