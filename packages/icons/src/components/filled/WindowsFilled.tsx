'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Windows from '../../svg/filled/windows.svg'
import type { IconProps } from '../../types'

export const WindowsFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Windows, { className: 'windows-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WindowsFilled.displayName = 'WindowsFilled'
