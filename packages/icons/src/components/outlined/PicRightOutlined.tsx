import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PicRight from '../../svg/outlined/pic-right.svg'
import type { IconProps } from '../../types'

export const PicRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PicRight)
    return <Icon {...props} ref={ref} />
  },
)
