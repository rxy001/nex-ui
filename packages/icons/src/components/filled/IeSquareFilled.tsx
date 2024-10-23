import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import IeSquare from '../../svg/filled/ie-square.svg'
import type { IconProps } from '../../types'

export const IeSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(IeSquare, { className: 'ie-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
