import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseSquare from '../../svg/outlined/close-square.svg'
import type { IconProps } from '../../types'

export const CloseSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloseSquare, { className: 'close-square-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
