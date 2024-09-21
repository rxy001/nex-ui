import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Moon from '../../svg/filled/moon.svg'
import type { IconProps } from '../../types'

export const MoonFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Moon)
  return <Icon {...props} ref={ref} />
})
