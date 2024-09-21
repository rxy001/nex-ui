import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import User from '../../svg/outlined/user.svg'
import type { IconProps } from '../../types'

export const UserOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(User)
  return <Icon {...props} ref={ref} />
})
