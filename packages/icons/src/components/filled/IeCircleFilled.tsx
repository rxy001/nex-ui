import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import IeCircle from '../../svg/filled/ie-circle.svg'
import type { IconProps } from '../../types'

export const IeCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(IeCircle)
    return <Icon {...props} ref={ref} />
  },
)
