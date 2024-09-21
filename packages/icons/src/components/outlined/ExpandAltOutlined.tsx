import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ExpandAlt from '../../svg/outlined/expand-alt.svg'
import type { IconProps } from '../../types'

export const ExpandAltOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ExpandAlt)
    return <Icon {...props} ref={ref} />
  },
)
