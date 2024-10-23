import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretDown from '../../svg/filled/caret-down.svg'
import type { IconProps } from '../../types'

export const CaretDownFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretDown, { className: 'caret-down-filled' })
    return <Icon {...props} ref={ref} />
  },
)
