import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import WechatWork from '../../svg/outlined/wechat-work.svg'
import type { IconProps } from '../../types'

export const WechatWorkOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(WechatWork)
    return <Icon {...props} ref={ref} />
  },
)
