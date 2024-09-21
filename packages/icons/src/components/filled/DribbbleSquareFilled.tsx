import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DribbbleSquare from '../../svg/filled/dribbble-square.svg'
import type { IconProps } from '../../types'

export const DribbbleSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DribbbleSquare)
    return <Icon {...props} ref={ref} />
  },
)
