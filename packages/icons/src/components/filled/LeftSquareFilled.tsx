import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftSquare from '../../svg/filled/left-square.svg'
import type { IconProps } from '../../types'

export const LeftSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(LeftSquare, { className: 'left-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
