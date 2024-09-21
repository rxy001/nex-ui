import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Stop from '../../svg/outlined/stop.svg'
import type { IconProps } from '../../types'

export const StopOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Stop)
  return <Icon {...props} ref={ref} />
})
