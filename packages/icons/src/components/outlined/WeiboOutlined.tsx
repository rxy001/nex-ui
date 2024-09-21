import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Weibo from '../../svg/outlined/weibo.svg'
import type { IconProps } from '../../types'

export const WeiboOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Weibo)
    return <Icon {...props} ref={ref} />
  },
)
