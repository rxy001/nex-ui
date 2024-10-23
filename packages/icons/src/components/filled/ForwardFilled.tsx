import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Forward from '../../svg/filled/forward.svg'
import type { IconProps } from '../../types'

export const ForwardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Forward, { className: 'forward-filled' })
    return <Icon {...props} ref={ref} />
  },
)
