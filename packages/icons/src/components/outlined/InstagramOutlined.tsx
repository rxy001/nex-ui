'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Instagram from '../../svg/outlined/instagram.svg'
import type { IconProps } from '../../types'

export const InstagramOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Instagram, { className: 'instagram-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InstagramOutlined.displayName = 'InstagramOutlined'
