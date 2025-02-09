'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlusCircle from '../../svg/outlined/plus-circle.svg'
import type { IconProps } from '../../types'

export const PlusCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlusCircle, { className: 'plus-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlusCircleOutlined.displayName = 'PlusCircleOutlined'
