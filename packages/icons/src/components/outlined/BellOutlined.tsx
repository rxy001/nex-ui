import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bell from '../../svg/outlined/bell.svg'
import type { IconProps } from '../../types'

export const BellOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Bell, { className: 'bell-outlined' })
  return <Icon {...props} ref={ref} />
})
