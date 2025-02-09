'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Logout from '../../svg/outlined/logout.svg'
import type { IconProps } from '../../types'

export const LogoutOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Logout, { className: 'logout-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LogoutOutlined.displayName = 'LogoutOutlined'
