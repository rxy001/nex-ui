import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Number from '../../svg/outlined/number.svg'
import type { IconProps } from '../../types'

export const NumberOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Number, { className: 'number-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

NumberOutlined.displayName = 'NumberOutlined'
