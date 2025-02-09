'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowLeft from '../../svg/outlined/insert-row-left.svg'
import type { IconProps } from '../../types'

export const InsertRowLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(InsertRowLeft, { className: 'insert-row-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InsertRowLeftOutlined.displayName = 'InsertRowLeftOutlined'
