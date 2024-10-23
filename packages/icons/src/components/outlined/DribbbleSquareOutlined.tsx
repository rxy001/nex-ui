import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DribbbleSquare from '../../svg/outlined/dribbble-square.svg'
import type { IconProps } from '../../types'

export const DribbbleSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DribbbleSquare, {
      className: 'dribbble-square-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
