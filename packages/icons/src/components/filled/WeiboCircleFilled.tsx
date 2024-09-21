import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import WeiboCircle from '../../svg/filled/weibo-circle.svg'
import type { IconProps } from '../../types'

export const WeiboCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(WeiboCircle)
    return <Icon {...props} ref={ref} />
  },
)
