import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sun from '../../svg/outlined/sun.svg'
import type { IconProps } from '../../types'

export const SunOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Sun)
  return <Icon {...props} ref={ref} />
})
