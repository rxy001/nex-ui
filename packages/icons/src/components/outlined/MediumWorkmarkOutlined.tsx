import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MediumWorkmark from '../../svg/outlined/medium-workmark.svg'
import type { IconProps } from '../../types'

export const MediumWorkmarkOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MediumWorkmark)
    return <Icon {...props} ref={ref} />
  },
)
