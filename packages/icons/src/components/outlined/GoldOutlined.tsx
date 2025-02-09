'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gold from '../../svg/outlined/gold.svg'
import type { IconProps } from '../../types'

export const GoldOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Gold, { className: 'gold-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GoldOutlined.displayName = 'GoldOutlined'
