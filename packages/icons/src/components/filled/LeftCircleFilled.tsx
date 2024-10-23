import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftCircle from '../../svg/filled/left-circle.svg'
import type { IconProps } from '../../types'

export const LeftCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(LeftCircle, { className: 'left-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
