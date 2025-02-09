'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretDown from '../../svg/outlined/caret-down.svg'
import type { IconProps } from '../../types'

export const CaretDownOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CaretDown, { className: 'caret-down-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CaretDownOutlined.displayName = 'CaretDownOutlined'
