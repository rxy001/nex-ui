'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PicRight from '../../svg/outlined/pic-right.svg'
import type { IconProps } from '../../types'

export const PicRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PicRight, { className: 'pic-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PicRightOutlined.displayName = 'PicRightOutlined'
