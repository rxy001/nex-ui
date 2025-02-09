'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BehanceSquare from '../../svg/filled/behance-square.svg'
import type { IconProps } from '../../types'

export const BehanceSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BehanceSquare, { className: 'behance-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BehanceSquareFilled.displayName = 'BehanceSquareFilled'
