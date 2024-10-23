import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sun from '../../svg/filled/sun.svg'
import type { IconProps } from '../../types'

export const SunFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Sun, { className: 'sun-filled' })
  return <Icon {...props} ref={ref} />
})
