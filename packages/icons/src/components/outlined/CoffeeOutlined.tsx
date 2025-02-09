'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Coffee from '../../svg/outlined/coffee.svg'
import type { IconProps } from '../../types'

export const CoffeeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Coffee, { className: 'coffee-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CoffeeOutlined.displayName = 'CoffeeOutlined'
