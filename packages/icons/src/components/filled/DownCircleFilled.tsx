import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DownCircle from '../../svg/filled/down-circle.svg'
import type { IconProps } from '../../types'

export const DownCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DownCircle)
    return <Icon {...props} ref={ref} />
  },
)
