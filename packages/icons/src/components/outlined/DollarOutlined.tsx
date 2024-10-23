import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dollar from '../../svg/outlined/dollar.svg'
import type { IconProps } from '../../types'

export const DollarOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dollar, { className: 'dollar-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
