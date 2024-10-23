import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hdd from '../../svg/filled/hdd.svg'
import type { IconProps } from '../../types'

export const HddFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Hdd, { className: 'hdd-filled' })
  return <Icon {...props} ref={ref} />
})
