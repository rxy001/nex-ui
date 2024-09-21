import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Profile from '../../svg/filled/profile.svg'
import type { IconProps } from '../../types'

export const ProfileFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Profile)
    return <Icon {...props} ref={ref} />
  },
)
