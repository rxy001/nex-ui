import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alibaba from '../../svg/outlined/alibaba.svg'
import type { IconProps } from '../../types'

export const AlibabaOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Alibaba)
    return <Icon {...props} ref={ref} />
  },
)
