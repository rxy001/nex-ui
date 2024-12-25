import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Highlight from '../../svg/outlined/highlight.svg'
import type { IconProps } from '../../types'

export const HighlightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Highlight, { className: 'highlight-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
