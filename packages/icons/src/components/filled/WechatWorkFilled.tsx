import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import WechatWork from '../../svg/filled/wechat-work.svg'
import type { IconProps } from '../../types'

export const WechatWorkFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(WechatWork, { className: 'wechat-work-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WechatWorkFilled.displayName = 'WechatWorkFilled'
