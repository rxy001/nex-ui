import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wechat from '../../svg/filled/wechat.svg'
import type { IconProps } from '../../types'

export const WechatFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Wechat, { className: 'wechat-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WechatFilled.displayName = 'WechatFilled'
