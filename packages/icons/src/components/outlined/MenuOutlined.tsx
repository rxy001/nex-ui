'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Menu from '../../svg/outlined/menu.svg'
import type { IconProps } from '../../types'

export const MenuOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Menu, { className: 'menu-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MenuOutlined.displayName = 'MenuOutlined'
