'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlignLeft from '../../svg/outlined/align-left.svg'
import type { IconProps } from '../../types'

export const AlignLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AlignLeft, { className: 'align-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlignLeftOutlined.displayName = 'AlignLeftOutlined'
