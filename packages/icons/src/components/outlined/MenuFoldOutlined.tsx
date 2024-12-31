import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MenuFold from '../../svg/outlined/menu-fold.svg'
import type { IconProps } from '../../types'

export const MenuFoldOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MenuFold, { className: 'menu-fold-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MenuFoldOutlined.displayName = 'MenuFoldOutlined'
