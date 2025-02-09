'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlusSquare from '../../svg/filled/plus-square.svg'
import type { IconProps } from '../../types'

export const PlusSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlusSquare, { className: 'plus-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlusSquareFilled.displayName = 'PlusSquareFilled'
