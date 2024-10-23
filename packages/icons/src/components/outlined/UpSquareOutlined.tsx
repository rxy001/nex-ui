import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpSquare from '../../svg/outlined/up-square.svg'
import type { IconProps } from '../../types'

export const UpSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UpSquare, { className: 'up-square-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
