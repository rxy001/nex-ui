import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import More from '../../svg/outlined/more.svg'
import type { IconProps } from '../../types'

export const MoreOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(More, { className: 'more-outlined' })
  return <Icon {...props} ref={ref} />
})
