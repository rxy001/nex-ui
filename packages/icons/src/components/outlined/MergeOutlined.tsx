'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Merge from '../../svg/outlined/merge.svg'
import type { IconProps } from '../../types'

export const MergeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Merge, { className: 'merge-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MergeOutlined.displayName = 'MergeOutlined'
