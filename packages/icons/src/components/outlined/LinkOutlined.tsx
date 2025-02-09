'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Link from '../../svg/outlined/link.svg'
import type { IconProps } from '../../types'

export const LinkOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Link, { className: 'link-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LinkOutlined.displayName = 'LinkOutlined'
