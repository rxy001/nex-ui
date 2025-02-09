'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CopyrightCircle from '../../svg/filled/copyright-circle.svg'
import type { IconProps } from '../../types'

export const CopyrightCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(CopyrightCircle, { className: 'copyright-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CopyrightCircleFilled.displayName = 'CopyrightCircleFilled'
