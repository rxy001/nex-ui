'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fall from '../../svg/outlined/fall.svg'
import type { IconProps } from '../../types'

export const FallOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Fall, { className: 'fall-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FallOutlined.displayName = 'FallOutlined'
