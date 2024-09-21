import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Medium from '../../svg/outlined/medium.svg'
import type { IconProps } from '../../types'

export const MediumOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Medium)
    return <Icon {...props} ref={ref} />
  },
)
