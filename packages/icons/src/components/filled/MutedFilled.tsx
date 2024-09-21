import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Muted from '../../svg/filled/muted.svg'
import type { IconProps } from '../../types'

export const MutedFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Muted)
  return <Icon {...props} ref={ref} />
})
