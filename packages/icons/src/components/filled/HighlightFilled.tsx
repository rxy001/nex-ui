import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Highlight from '../../svg/filled/highlight.svg'
import type { IconProps } from '../../types'

export const HighlightFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Highlight, { className: 'highlight-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

HighlightFilled.displayName = 'HighlightFilled'
