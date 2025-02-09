'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Merge from '../../svg/filled/merge.svg'
import type { IconProps } from '../../types'

export const MergeFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Merge, { className: 'merge-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MergeFilled.displayName = 'MergeFilled'
