'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gif from '../../svg/outlined/gif.svg'
import type { IconProps } from '../../types'

export const GifOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Gif, { className: 'gif-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GifOutlined.displayName = 'GifOutlined'
