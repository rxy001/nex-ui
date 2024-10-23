import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretRight from '../../svg/outlined/caret-right.svg'
import type { IconProps } from '../../types'

export const CaretRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretRight, { className: 'caret-right-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
