import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bilibili from '../../svg/outlined/bilibili.svg'
import type { IconProps } from '../../types'

export const BilibiliOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Bilibili)
    return <Icon {...props} ref={ref} />
  },
)
