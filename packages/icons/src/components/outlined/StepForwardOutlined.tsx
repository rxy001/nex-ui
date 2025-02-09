'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepForward from '../../svg/outlined/step-forward.svg'
import type { IconProps } from '../../types'

export const StepForwardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(StepForward, { className: 'step-forward-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

StepForwardOutlined.displayName = 'StepForwardOutlined'
