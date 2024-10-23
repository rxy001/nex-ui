import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Check from '../../svg/outlined/check.svg'
import type { IconProps } from '../../types'

export const CheckOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Check, { className: 'check-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
