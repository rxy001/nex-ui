import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlignRight from '../../svg/outlined/align-right.svg'
import type { IconProps } from '../../types'

export const AlignRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AlignRight)
    return <Icon {...props} ref={ref} />
  },
)
