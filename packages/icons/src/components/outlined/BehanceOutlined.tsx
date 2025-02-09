'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Behance from '../../svg/outlined/behance.svg'
import type { IconProps } from '../../types'

export const BehanceOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Behance, { className: 'behance-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BehanceOutlined.displayName = 'BehanceOutlined'
