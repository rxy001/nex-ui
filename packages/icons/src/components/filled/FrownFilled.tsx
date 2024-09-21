import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Frown from '../../svg/filled/frown.svg'
import type { IconProps } from '../../types'

export const FrownFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Frown)
  return <Icon {...props} ref={ref} />
})
