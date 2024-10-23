import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckSquare from '../../svg/filled/check-square.svg'
import type { IconProps } from '../../types'

export const CheckSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CheckSquare, { className: 'check-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
