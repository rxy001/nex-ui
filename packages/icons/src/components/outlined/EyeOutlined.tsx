'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Eye from '../../svg/outlined/eye.svg'
import type { IconProps } from '../../types'

export const EyeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Eye, { className: 'eye-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

EyeOutlined.displayName = 'EyeOutlined'
