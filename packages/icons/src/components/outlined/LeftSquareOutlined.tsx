import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftSquare from '../../svg/outlined/left-square.svg'
import type { IconProps } from '../../types'

export const LeftSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(LeftSquare)
    return <Icon {...props} ref={ref} />
  },
)
