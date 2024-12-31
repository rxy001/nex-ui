import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretDown from '../../svg/filled/caret-down.svg'
import type { IconProps } from '../../types'

export const CaretDownFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CaretDown, { className: 'caret-down-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CaretDownFilled.displayName = 'CaretDownFilled'
