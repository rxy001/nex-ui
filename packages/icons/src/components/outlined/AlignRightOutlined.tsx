'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlignRight from '../../svg/outlined/align-right.svg'
import type { IconProps } from '../../types'

export const AlignRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AlignRight, { className: 'align-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlignRightOutlined.displayName = 'AlignRightOutlined'
