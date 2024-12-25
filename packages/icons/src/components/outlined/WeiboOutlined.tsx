import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Weibo from '../../svg/outlined/weibo.svg'
import type { IconProps } from '../../types'

export const WeiboOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Weibo, { className: 'weibo-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
