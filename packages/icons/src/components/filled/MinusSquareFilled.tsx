'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MinusSquare from '../../svg/filled/minus-square.svg'
import type { IconProps } from '../../types'

export const MinusSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MinusSquare, { className: 'minus-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MinusSquareFilled.displayName = 'MinusSquareFilled'
