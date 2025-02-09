'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedditCircle from '../../svg/filled/reddit-circle.svg'
import type { IconProps } from '../../types'

export const RedditCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RedditCircle, { className: 'reddit-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RedditCircleFilled.displayName = 'RedditCircleFilled'
