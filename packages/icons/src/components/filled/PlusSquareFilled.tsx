import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlusSquare from '../../svg/filled/plus-square.svg'
import type { IconProps } from '../../types'

export const PlusSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PlusSquare)
    return <Icon {...props} ref={ref} />
  },
)
