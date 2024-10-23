import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import LineHeight from '../../svg/outlined/line-height.svg'
import type { IconProps } from '../../types'

export const LineHeightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(LineHeight, { className: 'line-height-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
