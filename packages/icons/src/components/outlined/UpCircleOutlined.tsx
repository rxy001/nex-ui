'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpCircle from '../../svg/outlined/up-circle.svg'
import type { IconProps } from '../../types'

export const UpCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UpCircle, { className: 'up-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UpCircleOutlined.displayName = 'UpCircleOutlined'
