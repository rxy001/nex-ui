import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MinusCircle from '../../svg/outlined/minus-circle.svg'
import type { IconProps } from '../../types'

export const MinusCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MinusCircle, { className: 'minus-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
