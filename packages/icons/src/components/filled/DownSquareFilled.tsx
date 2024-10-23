import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DownSquare from '../../svg/filled/down-square.svg'
import type { IconProps } from '../../types'

export const DownSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DownSquare, { className: 'down-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
