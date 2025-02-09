'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseCircle from '../../svg/outlined/close-circle.svg'
import type { IconProps } from '../../types'

export const CloseCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloseCircle, { className: 'close-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloseCircleOutlined.displayName = 'CloseCircleOutlined'
