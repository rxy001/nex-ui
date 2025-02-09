'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Yuque from '../../svg/filled/yuque.svg'
import type { IconProps } from '../../types'

export const YuqueFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Yuque, { className: 'yuque-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

YuqueFilled.displayName = 'YuqueFilled'
