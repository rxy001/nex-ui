import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DribbbleSquare from '../../svg/filled/dribbble-square.svg'
import type { IconProps } from '../../types'

export const DribbbleSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DribbbleSquare, { className: 'dribbble-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
