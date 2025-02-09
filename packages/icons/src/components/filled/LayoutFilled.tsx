'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Layout from '../../svg/filled/layout.svg'
import type { IconProps } from '../../types'

export const LayoutFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Layout, { className: 'layout-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LayoutFilled.displayName = 'LayoutFilled'
