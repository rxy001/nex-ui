'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Safety from '../../svg/outlined/safety.svg'
import type { IconProps } from '../../types'

export const SafetyOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Safety, { className: 'safety-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SafetyOutlined.displayName = 'SafetyOutlined'
