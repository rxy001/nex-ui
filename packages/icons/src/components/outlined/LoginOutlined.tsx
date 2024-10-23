import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Login from '../../svg/outlined/login.svg'
import type { IconProps } from '../../types'

export const LoginOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Login, { className: 'login-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
