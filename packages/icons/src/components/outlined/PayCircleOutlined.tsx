import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PayCircle from '../../svg/outlined/pay-circle.svg'
import type { IconProps } from '../../types'

export const PayCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PayCircle, { className: 'pay-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
