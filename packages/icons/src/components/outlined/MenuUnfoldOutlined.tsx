'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MenuUnfold from '../../svg/outlined/menu-unfold.svg'
import type { IconProps } from '../../types'

export const MenuUnfoldOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MenuUnfold, { className: 'menu-unfold-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MenuUnfoldOutlined.displayName = 'MenuUnfoldOutlined'
