import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wechat from '../../svg/outlined/wechat.svg'
import type { IconProps } from '../../types'

export const WechatOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Wechat, { className: 'wechat-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
