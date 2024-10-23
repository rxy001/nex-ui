import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DownSquare from '../../svg/outlined/down-square.svg'
import type { IconProps } from '../../types'

export const DownSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DownSquare, { className: 'down-square-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
