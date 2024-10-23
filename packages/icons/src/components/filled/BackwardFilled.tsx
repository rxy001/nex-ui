import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Backward from '../../svg/filled/backward.svg'
import type { IconProps } from '../../types'

export const BackwardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Backward, { className: 'backward-filled' })
    return <Icon {...props} ref={ref} />
  },
)
