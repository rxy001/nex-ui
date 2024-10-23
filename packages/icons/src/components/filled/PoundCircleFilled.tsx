import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PoundCircle from '../../svg/filled/pound-circle.svg'
import type { IconProps } from '../../types'

export const PoundCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PoundCircle, { className: 'pound-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
