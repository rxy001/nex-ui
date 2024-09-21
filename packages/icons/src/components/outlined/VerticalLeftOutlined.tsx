import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalLeft from '../../svg/outlined/vertical-left.svg'
import type { IconProps } from '../../types'

export const VerticalLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VerticalLeft)
    return <Icon {...props} ref={ref} />
  },
)
