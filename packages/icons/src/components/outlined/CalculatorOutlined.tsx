import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calculator from '../../svg/outlined/calculator.svg'
import type { IconProps } from '../../types'

export const CalculatorOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Calculator)
    return <Icon {...props} ref={ref} />
  },
)
