'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalRight from '../../svg/outlined/vertical-right.svg'
import type { IconProps } from '../../types'

export const VerticalRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(VerticalRight, { className: 'vertical-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

VerticalRightOutlined.displayName = 'VerticalRightOutlined'
