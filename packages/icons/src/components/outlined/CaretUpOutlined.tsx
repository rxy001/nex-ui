import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretUp from '../../svg/outlined/caret-up.svg'
import type { IconProps } from '../../types'

export const CaretUpOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretUp, { className: 'caret-up-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
