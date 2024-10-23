import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MenuUnfold from '../../svg/outlined/menu-unfold.svg'
import type { IconProps } from '../../types'

export const MenuUnfoldOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MenuUnfold, { className: 'menu-unfold-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
