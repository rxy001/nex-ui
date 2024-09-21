import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlignLeft from '../../svg/outlined/align-left.svg'
import type { IconProps } from '../../types'

export const AlignLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AlignLeft)
    return <Icon {...props} ref={ref} />
  },
)
