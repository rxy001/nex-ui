import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalAlignMiddle from '../../svg/outlined/vertical-align-middle.svg'
import type { IconProps } from '../../types'

export const VerticalAlignMiddleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VerticalAlignMiddle)
    return <Icon {...props} ref={ref} />
  },
)
