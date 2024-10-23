import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Car from '../../svg/filled/car.svg'
import type { IconProps } from '../../types'

export const CarFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Car, { className: 'car-filled' })
  return <Icon {...props} ref={ref} />
})
