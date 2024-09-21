import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Zhihu from '../../svg/outlined/zhihu.svg'
import type { IconProps } from '../../types'

export const ZhihuOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Zhihu)
    return <Icon {...props} ref={ref} />
  },
)
