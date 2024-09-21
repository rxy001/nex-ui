import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Yuque from '../../svg/outlined/yuque.svg'
import type { IconProps } from '../../types'

export const YuqueOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Yuque)
    return <Icon {...props} ref={ref} />
  },
)
