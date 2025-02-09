'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BehanceSquare from '../../svg/outlined/behance-square.svg'
import type { IconProps } from '../../types'

export const BehanceSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BehanceSquare, { className: 'behance-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BehanceSquareOutlined.displayName = 'BehanceSquareOutlined'
