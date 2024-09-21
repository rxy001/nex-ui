import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hdd from '../../svg/outlined/hdd.svg'
import type { IconProps } from '../../types'

export const HddOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Hdd)
  return <Icon {...props} ref={ref} />
})
