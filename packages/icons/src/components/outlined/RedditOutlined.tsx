import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reddit from '../../svg/outlined/reddit.svg'
import type { IconProps } from '../../types'

export const RedditOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Reddit, { className: 'reddit-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
