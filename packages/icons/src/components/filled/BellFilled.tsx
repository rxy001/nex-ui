import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bell from '../../svg/filled/bell.svg'
import type { IconProps } from '../../types'

export const BellFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Bell)
  return <Icon {...props} ref={ref} />
})
