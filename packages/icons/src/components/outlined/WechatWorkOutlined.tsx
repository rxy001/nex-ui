'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import WechatWork from '../../svg/outlined/wechat-work.svg'
import type { IconProps } from '../../types'

export const WechatWorkOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(WechatWork, { className: 'wechat-work-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WechatWorkOutlined.displayName = 'WechatWorkOutlined'
