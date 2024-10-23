import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Layout from '../../svg/filled/layout.svg'
import type { IconProps } from '../../types'

export const LayoutFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Layout, { className: 'layout-filled' })
  return <Icon {...props} ref={ref} />
})
