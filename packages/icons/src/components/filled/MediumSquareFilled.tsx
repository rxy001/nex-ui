'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MediumSquare from '../../svg/filled/medium-square.svg'
import type { IconProps } from '../../types'

export const MediumSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MediumSquare, { className: 'medium-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MediumSquareFilled.displayName = 'MediumSquareFilled'
