import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DribbbleSquare from '../../svg/outlined/dribbble-square.svg'
import type { IconProps } from '../../types'

export const DribbbleSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(DribbbleSquare, { className: 'dribbble-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
