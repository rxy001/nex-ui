'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Redo from '../../svg/outlined/redo.svg'
import type { IconProps } from '../../types'

export const RedoOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Redo, { className: 'redo-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RedoOutlined.displayName = 'RedoOutlined'
