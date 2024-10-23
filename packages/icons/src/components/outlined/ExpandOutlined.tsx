import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Expand from '../../svg/outlined/expand.svg'
import type { IconProps } from '../../types'

export const ExpandOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Expand, { className: 'expand-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
