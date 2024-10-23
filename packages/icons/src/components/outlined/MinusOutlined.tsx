import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Minus from '../../svg/outlined/minus.svg'
import type { IconProps } from '../../types'

export const MinusOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Minus, { className: 'minus-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
