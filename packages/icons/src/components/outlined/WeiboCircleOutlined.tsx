import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import WeiboCircle from '../../svg/outlined/weibo-circle.svg'
import type { IconProps } from '../../types'

export const WeiboCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(WeiboCircle, { className: 'weibo-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
