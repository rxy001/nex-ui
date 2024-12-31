import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PayCircle from '../../svg/outlined/pay-circle.svg'
import type { IconProps } from '../../types'

export const PayCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PayCircle, { className: 'pay-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PayCircleOutlined.displayName = 'PayCircleOutlined'
