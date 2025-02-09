'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Diff from '../../svg/outlined/diff.svg'
import type { IconProps } from '../../types'

export const DiffOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Diff, { className: 'diff-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DiffOutlined.displayName = 'DiffOutlined'
