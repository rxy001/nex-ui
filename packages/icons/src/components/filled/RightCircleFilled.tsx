import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RightCircle from '../../svg/filled/right-circle.svg'
import type { IconProps } from '../../types'

export const RightCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RightCircle, { className: 'right-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
