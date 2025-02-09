'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fork from '../../svg/outlined/fork.svg'
import type { IconProps } from '../../types'

export const ForkOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Fork, { className: 'fork-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ForkOutlined.displayName = 'ForkOutlined'
