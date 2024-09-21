import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BehanceSquare from '../../svg/filled/behance-square.svg'
import type { IconProps } from '../../types'

export const BehanceSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BehanceSquare)
    return <Icon {...props} ref={ref} />
  },
)
