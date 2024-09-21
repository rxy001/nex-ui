import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pinterest from '../../svg/outlined/pinterest.svg'
import type { IconProps } from '../../types'

export const PinterestOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Pinterest)
    return <Icon {...props} ref={ref} />
  },
)
