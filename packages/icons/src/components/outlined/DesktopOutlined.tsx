import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Desktop from '../../svg/outlined/desktop.svg'
import type { IconProps } from '../../types'

export const DesktopOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Desktop, { className: 'desktop-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
