import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Number from '../../svg/outlined/number.svg'
import type { IconProps } from '../../types'

export const NumberOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Number, { className: 'number-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
