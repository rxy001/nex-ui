'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Car from '../../svg/filled/car.svg'
import type { IconProps } from '../../types'

export const CarFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Car, { className: 'car-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

CarFilled.displayName = 'CarFilled'
