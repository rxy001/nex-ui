'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import WeiboCircle from '../../svg/filled/weibo-circle.svg'
import type { IconProps } from '../../types'

export const WeiboCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(WeiboCircle, { className: 'weibo-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WeiboCircleFilled.displayName = 'WeiboCircleFilled'
