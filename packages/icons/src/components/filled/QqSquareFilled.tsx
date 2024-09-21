import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import QqSquare from '../../svg/filled/qq-square.svg'
import type { IconProps } from '../../types'

export const QqSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(QqSquare)
    return <Icon {...props} ref={ref} />
  },
)
