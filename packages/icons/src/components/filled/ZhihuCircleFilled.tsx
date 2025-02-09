'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZhihuCircle from '../../svg/filled/zhihu-circle.svg'
import type { IconProps } from '../../types'

export const ZhihuCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ZhihuCircle, { className: 'zhihu-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ZhihuCircleFilled.displayName = 'ZhihuCircleFilled'
