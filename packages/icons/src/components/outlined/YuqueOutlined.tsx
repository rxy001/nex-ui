'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Yuque from '../../svg/outlined/yuque.svg'
import type { IconProps } from '../../types'

export const YuqueOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Yuque, { className: 'yuque-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

YuqueOutlined.displayName = 'YuqueOutlined'
