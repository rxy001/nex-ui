'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import GooglePlusCircle from '../../svg/filled/google-plus-circle.svg'
import type { IconProps } from '../../types'

export const GooglePlusCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(GooglePlusCircle, {
          className: 'google-plus-circle-filled',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GooglePlusCircleFilled.displayName = 'GooglePlusCircleFilled'
