import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Layout from '../../svg/outlined/layout.svg'
import type { IconProps } from '../../types'

export const LayoutOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Layout, { className: 'layout-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
