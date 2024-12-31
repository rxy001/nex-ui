import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Zhihu from '../../svg/outlined/zhihu.svg'
import type { IconProps } from '../../types'

export const ZhihuOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Zhihu, { className: 'zhihu-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ZhihuOutlined.displayName = 'ZhihuOutlined'
