import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bars from '../../svg/outlined/bars.svg'
import type { IconProps } from '../../types'

export const BarsOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Bars)
  return <Icon {...props} ref={ref} />
})
