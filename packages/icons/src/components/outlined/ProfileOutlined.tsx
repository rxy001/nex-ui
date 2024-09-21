import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Profile from '../../svg/outlined/profile.svg'
import type { IconProps } from '../../types'

export const ProfileOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Profile)
    return <Icon {...props} ref={ref} />
  },
)
