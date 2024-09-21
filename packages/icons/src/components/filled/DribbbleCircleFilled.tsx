import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DribbbleCircle from '../../svg/filled/dribbble-circle.svg'
import type { IconProps } from '../../types'

export const DribbbleCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DribbbleCircle)
    return <Icon {...props} ref={ref} />
  },
)
