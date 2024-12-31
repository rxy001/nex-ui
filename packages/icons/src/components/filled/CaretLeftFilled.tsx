import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretLeft from '../../svg/filled/caret-left.svg'
import type { IconProps } from '../../types'

export const CaretLeftFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CaretLeft, { className: 'caret-left-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CaretLeftFilled.displayName = 'CaretLeftFilled'
