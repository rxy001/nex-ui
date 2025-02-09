'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shrink from '../../svg/outlined/shrink.svg'
import type { IconProps } from '../../types'

export const ShrinkOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Shrink, { className: 'shrink-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ShrinkOutlined.displayName = 'ShrinkOutlined'
