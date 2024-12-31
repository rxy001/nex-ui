import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Login from '../../svg/outlined/login.svg'
import type { IconProps } from '../../types'

export const LoginOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Login, { className: 'login-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LoginOutlined.displayName = 'LoginOutlined'
