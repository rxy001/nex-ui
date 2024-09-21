import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Car from '../../svg/outlined/car.svg'
import type { IconProps } from '../../types'

export const CarOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Car)
  return <Icon {...props} ref={ref} />
})
