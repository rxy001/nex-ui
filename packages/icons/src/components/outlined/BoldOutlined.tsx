'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bold from '../../svg/outlined/bold.svg'
import type { IconProps } from '../../types'

export const BoldOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bold, { className: 'bold-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BoldOutlined.displayName = 'BoldOutlined'
