import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DollarCircle from '../../svg/filled/dollar-circle.svg'
import type { IconProps } from '../../types'

export const DollarCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DollarCircle, { className: 'dollar-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
