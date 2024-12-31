import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedditSquare from '../../svg/filled/reddit-square.svg'
import type { IconProps } from '../../types'

export const RedditSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RedditSquare, { className: 'reddit-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RedditSquareFilled.displayName = 'RedditSquareFilled'
