import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DribbbleCircle from '../../svg/filled/dribbble-circle.svg'
import type { IconProps } from '../../types'

export const DribbbleCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DribbbleCircle, { className: 'dribbble-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DribbbleCircleFilled.displayName = 'DribbbleCircleFilled'
