import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import WeiboSquare from '../../svg/outlined/weibo-square.svg'
import type { IconProps } from '../../types'

export const WeiboSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(WeiboSquare, { className: 'weibo-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WeiboSquareOutlined.displayName = 'WeiboSquareOutlined'
