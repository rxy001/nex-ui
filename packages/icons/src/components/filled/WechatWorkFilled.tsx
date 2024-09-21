import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import WechatWork from '../../svg/filled/wechat-work.svg'
import type { IconProps } from '../../types'

export const WechatWorkFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(WechatWork)
    return <Icon {...props} ref={ref} />
  },
)
