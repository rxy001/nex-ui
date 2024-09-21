import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Team from '../../svg/outlined/team.svg'
import type { IconProps } from '../../types'

export const TeamOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Team)
  return <Icon {...props} ref={ref} />
})
