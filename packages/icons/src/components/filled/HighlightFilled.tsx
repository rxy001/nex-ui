import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Highlight from '../../svg/filled/highlight.svg'
import type { IconProps } from '../../types'

export const HighlightFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Highlight)
    return <Icon {...props} ref={ref} />
  },
)
