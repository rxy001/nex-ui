import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MenuFold from '../../svg/outlined/menu-fold.svg'
import type { IconProps } from '../../types'

export const MenuFoldOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MenuFold)
    return <Icon {...props} ref={ref} />
  },
)
