import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Home from '../../svg/outlined/home.svg'
import type { IconProps } from '../../types'

export const HomeOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Home, { className: 'home-outlined' })
  return <Icon {...props} ref={ref} />
})
