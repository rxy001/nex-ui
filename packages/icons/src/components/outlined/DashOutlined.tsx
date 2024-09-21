import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dash from '../../svg/outlined/dash.svg'
import type { IconProps } from '../../types'

export const DashOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Dash)
  return <Icon {...props} ref={ref} />
})
