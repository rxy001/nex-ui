import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PicLeft from '../../svg/outlined/pic-left.svg'
import type { IconProps } from '../../types'

export const PicLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PicLeft)
    return <Icon {...props} ref={ref} />
  },
)
