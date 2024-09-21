import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RightSquare from '../../svg/outlined/right-square.svg'
import type { IconProps } from '../../types'

export const RightSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RightSquare)
    return <Icon {...props} ref={ref} />
  },
)
