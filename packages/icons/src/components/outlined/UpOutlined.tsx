import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Up from '../../svg/outlined/up.svg'
import type { IconProps } from '../../types'

export const UpOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Up)
  return <Icon {...props} ref={ref} />
})
