import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ie from '../../svg/outlined/ie.svg'
import type { IconProps } from '../../types'

export const IeOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Ie)
  return <Icon {...props} ref={ref} />
})
