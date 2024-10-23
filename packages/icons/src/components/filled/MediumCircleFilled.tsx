import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MediumCircle from '../../svg/filled/medium-circle.svg'
import type { IconProps } from '../../types'

export const MediumCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MediumCircle, { className: 'medium-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
