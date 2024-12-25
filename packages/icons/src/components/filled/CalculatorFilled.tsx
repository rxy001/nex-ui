import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calculator from '../../svg/filled/calculator.svg'
import type { IconProps } from '../../types'

export const CalculatorFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Calculator, { className: 'calculator-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
