import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Highlight from '../../svg/outlined/highlight.svg'
import type { IconProps } from '../../types'

export const HighlightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Highlight)
    return <Icon {...props} ref={ref} />
  },
)
