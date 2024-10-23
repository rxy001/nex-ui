import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedditSquare from '../../svg/filled/reddit-square.svg'
import type { IconProps } from '../../types'

export const RedditSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RedditSquare, { className: 'reddit-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
