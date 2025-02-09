'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowUp from '../../svg/outlined/arrow-up.svg'
import type { IconProps } from '../../types'

export const ArrowUpOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ArrowUp, { className: 'arrow-up-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ArrowUpOutlined.displayName = 'ArrowUpOutlined'
