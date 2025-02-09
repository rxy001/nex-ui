'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlusCircle from '../../svg/filled/plus-circle.svg'
import type { IconProps } from '../../types'

export const PlusCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlusCircle, { className: 'plus-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlusCircleFilled.displayName = 'PlusCircleFilled'
