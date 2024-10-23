import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderTop from '../../svg/outlined/border-top.svg'
import type { IconProps } from '../../types'

export const BorderTopOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderTop, { className: 'border-top-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
