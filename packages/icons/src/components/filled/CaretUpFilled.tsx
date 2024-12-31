import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretUp from '../../svg/filled/caret-up.svg'
import type { IconProps } from '../../types'

export const CaretUpFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CaretUp, { className: 'caret-up-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CaretUpFilled.displayName = 'CaretUpFilled'
