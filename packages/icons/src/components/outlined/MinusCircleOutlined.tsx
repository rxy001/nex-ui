'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MinusCircle from '../../svg/outlined/minus-circle.svg'
import type { IconProps } from '../../types'

export const MinusCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MinusCircle, { className: 'minus-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MinusCircleOutlined.displayName = 'MinusCircleOutlined'
