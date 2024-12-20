import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckCircle from '../../svg/outlined/check-circle.svg'
import type { IconProps } from '../../types'

export const CheckCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CheckCircle, { className: 'check-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
