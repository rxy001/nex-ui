import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpSquare from '../../svg/filled/up-square.svg'
import type { IconProps } from '../../types'

export const UpSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UpSquare, { className: 'up-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
