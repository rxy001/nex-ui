import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Crown from '../../svg/filled/crown.svg'
import type { IconProps } from '../../types'

export const CrownFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Crown)
  return <Icon {...props} ref={ref} />
})
