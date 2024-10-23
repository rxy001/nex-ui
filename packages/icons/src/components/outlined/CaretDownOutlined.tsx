import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretDown from '../../svg/outlined/caret-down.svg'
import type { IconProps } from '../../types'

export const CaretDownOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretDown, { className: 'caret-down-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
