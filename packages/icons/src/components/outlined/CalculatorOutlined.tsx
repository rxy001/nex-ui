import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calculator from '../../svg/outlined/calculator.svg'
import type { IconProps } from '../../types'

export const CalculatorOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Calculator, { className: 'calculator-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CalculatorOutlined.displayName = 'CalculatorOutlined'
