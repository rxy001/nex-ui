import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tablet from '../../svg/filled/tablet.svg'
import type { IconProps } from '../../types'

export const TabletFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Tablet)
  return <Icon {...props} ref={ref} />
})
