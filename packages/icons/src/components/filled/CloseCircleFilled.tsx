'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseCircle from '../../svg/filled/close-circle.svg'
import type { IconProps } from '../../types'

export const CloseCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloseCircle, { className: 'close-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloseCircleFilled.displayName = 'CloseCircleFilled'
