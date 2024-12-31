import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wechat from '../../svg/outlined/wechat.svg'
import type { IconProps } from '../../types'

export const WechatOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Wechat, { className: 'wechat-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WechatOutlined.displayName = 'WechatOutlined'
