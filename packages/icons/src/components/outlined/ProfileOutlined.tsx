'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Profile from '../../svg/outlined/profile.svg'
import type { IconProps } from '../../types'

export const ProfileOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Profile, { className: 'profile-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ProfileOutlined.displayName = 'ProfileOutlined'
