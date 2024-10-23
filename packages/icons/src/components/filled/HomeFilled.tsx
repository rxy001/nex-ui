import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Home from '../../svg/filled/home.svg'
import type { IconProps } from '../../types'

export const HomeFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Home, { className: 'home-filled' })
  return <Icon {...props} ref={ref} />
})
