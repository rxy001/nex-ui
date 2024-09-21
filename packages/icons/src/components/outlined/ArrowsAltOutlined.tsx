import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowsAlt from '../../svg/outlined/arrows-alt.svg'
import type { IconProps } from '../../types'

export const ArrowsAltOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ArrowsAlt)
    return <Icon {...props} ref={ref} />
  },
)
