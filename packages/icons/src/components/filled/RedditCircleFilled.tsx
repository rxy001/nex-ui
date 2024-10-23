import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedditCircle from '../../svg/filled/reddit-circle.svg'
import type { IconProps } from '../../types'

export const RedditCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RedditCircle, { className: 'reddit-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
