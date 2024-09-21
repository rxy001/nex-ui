import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderBottom from '../../svg/outlined/border-bottom.svg'
import type { IconProps } from '../../types'

export const BorderBottomOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderBottom)
    return <Icon {...props} ref={ref} />
  },
)
