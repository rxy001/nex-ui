import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import WeiboSquare from '../../svg/outlined/weibo-square.svg'
import type { IconProps } from '../../types'

export const WeiboSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(WeiboSquare)
    return <Icon {...props} ref={ref} />
  },
)
