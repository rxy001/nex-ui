import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Layout from '../../svg/outlined/layout.svg'
import type { IconProps } from '../../types'

export const LayoutOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Layout, { className: 'layout-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
