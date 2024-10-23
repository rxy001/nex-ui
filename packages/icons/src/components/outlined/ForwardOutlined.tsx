import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Forward from '../../svg/outlined/forward.svg'
import type { IconProps } from '../../types'

export const ForwardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Forward, { className: 'forward-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
