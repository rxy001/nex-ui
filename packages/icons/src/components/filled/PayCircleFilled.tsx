import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PayCircle from '../../svg/filled/pay-circle.svg'
import type { IconProps } from '../../types'

export const PayCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PayCircle, { className: 'pay-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
