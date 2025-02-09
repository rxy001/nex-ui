'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Twitter from '../../svg/outlined/twitter.svg'
import type { IconProps } from '../../types'

export const TwitterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Twitter, { className: 'twitter-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TwitterOutlined.displayName = 'TwitterOutlined'
