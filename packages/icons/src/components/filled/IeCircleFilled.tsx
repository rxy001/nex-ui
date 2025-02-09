'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import IeCircle from '../../svg/filled/ie-circle.svg'
import type { IconProps } from '../../types'

export const IeCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(IeCircle, { className: 'ie-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

IeCircleFilled.displayName = 'IeCircleFilled'
