import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calculator from '../../svg/filled/calculator.svg'
import type { IconProps } from '../../types'

export const CalculatorFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Calculator, { className: 'calculator-filled' })
    return <Icon {...props} ref={ref} />
  },
)
