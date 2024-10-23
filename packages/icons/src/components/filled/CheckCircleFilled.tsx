import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckCircle from '../../svg/filled/check-circle.svg'
import type { IconProps } from '../../types'

export const CheckCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CheckCircle, { className: 'check-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
