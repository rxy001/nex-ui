import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseSquare from '../../svg/filled/close-square.svg'
import type { IconProps } from '../../types'

export const CloseSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloseSquare)
    return <Icon {...props} ref={ref} />
  },
)
