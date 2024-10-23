import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Flag from '../../svg/outlined/flag.svg'
import type { IconProps } from '../../types'

export const FlagOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Flag, { className: 'flag-outlined' })
  return <Icon {...props} ref={ref} />
})
