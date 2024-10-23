import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Menu from '../../svg/outlined/menu.svg'
import type { IconProps } from '../../types'

export const MenuOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Menu, { className: 'menu-outlined' })
  return <Icon {...props} ref={ref} />
})
