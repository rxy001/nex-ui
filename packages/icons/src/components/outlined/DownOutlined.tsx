import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Down from '../../svg/outlined/down.svg'
import type { IconProps } from '../../types'

export const DownOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Down, { className: 'down-outlined' })
  return <Icon {...props} ref={ref} />
})
