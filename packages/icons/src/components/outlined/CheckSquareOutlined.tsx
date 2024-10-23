import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckSquare from '../../svg/outlined/check-square.svg'
import type { IconProps } from '../../types'

export const CheckSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CheckSquare, { className: 'check-square-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
