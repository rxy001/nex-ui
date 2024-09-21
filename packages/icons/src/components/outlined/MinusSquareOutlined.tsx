import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MinusSquare from '../../svg/outlined/minus-square.svg'
import type { IconProps } from '../../types'

export const MinusSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MinusSquare)
    return <Icon {...props} ref={ref} />
  },
)
