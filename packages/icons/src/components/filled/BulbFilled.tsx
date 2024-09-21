import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bulb from '../../svg/filled/bulb.svg'
import type { IconProps } from '../../types'

export const BulbFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Bulb)
  return <Icon {...props} ref={ref} />
})
