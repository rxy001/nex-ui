import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reddit from '../../svg/outlined/reddit.svg'
import type { IconProps } from '../../types'

export const RedditOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Reddit, { className: 'reddit-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
