'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MinusCircle from '../../svg/filled/minus-circle.svg'
import type { IconProps } from '../../types'

export const MinusCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MinusCircle, { className: 'minus-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MinusCircleFilled.displayName = 'MinusCircleFilled'
