import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Smile from '../../svg/filled/smile.svg'
import type { IconProps } from '../../types'

export const SmileFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Smile)
  return <Icon {...props} ref={ref} />
})
