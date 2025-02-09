'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Picture from '../../svg/outlined/picture.svg'
import type { IconProps } from '../../types'

export const PictureOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Picture, { className: 'picture-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PictureOutlined.displayName = 'PictureOutlined'
