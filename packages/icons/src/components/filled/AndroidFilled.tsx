'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Android from '../../svg/filled/android.svg'
import type { IconProps } from '../../types'

export const AndroidFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Android, { className: 'android-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AndroidFilled.displayName = 'AndroidFilled'
