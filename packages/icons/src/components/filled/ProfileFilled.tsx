'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Profile from '../../svg/filled/profile.svg'
import type { IconProps } from '../../types'

export const ProfileFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Profile, { className: 'profile-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ProfileFilled.displayName = 'ProfileFilled'
