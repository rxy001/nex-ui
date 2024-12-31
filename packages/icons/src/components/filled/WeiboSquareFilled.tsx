import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import WeiboSquare from '../../svg/filled/weibo-square.svg'
import type { IconProps } from '../../types'

export const WeiboSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(WeiboSquare, { className: 'weibo-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WeiboSquareFilled.displayName = 'WeiboSquareFilled'
