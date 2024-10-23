import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderHorizontal from '../../svg/outlined/border-horizontal.svg'
import type { IconProps } from '../../types'

export const BorderHorizontalOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderHorizontal, {
      className: 'border-horizontal-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
