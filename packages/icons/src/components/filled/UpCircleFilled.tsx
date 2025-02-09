'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpCircle from '../../svg/filled/up-circle.svg'
import type { IconProps } from '../../types'

export const UpCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UpCircle, { className: 'up-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UpCircleFilled.displayName = 'UpCircleFilled'
