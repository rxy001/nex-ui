import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mobile from '../../svg/filled/mobile.svg'
import type { IconProps } from '../../types'

export const MobileFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Mobile)
  return <Icon {...props} ref={ref} />
})
