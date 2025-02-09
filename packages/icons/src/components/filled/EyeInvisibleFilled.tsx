'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import EyeInvisible from '../../svg/filled/eye-invisible.svg'
import type { IconProps } from '../../types'

export const EyeInvisibleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(EyeInvisible, { className: 'eye-invisible-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

EyeInvisibleFilled.displayName = 'EyeInvisibleFilled'
