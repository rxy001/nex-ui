import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Baidu from '../../svg/outlined/baidu.svg'
import type { IconProps } from '../../types'

export const BaiduOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Baidu)
    return <Icon {...props} ref={ref} />
  },
)
