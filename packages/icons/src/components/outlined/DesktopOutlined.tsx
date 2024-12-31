import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Desktop from '../../svg/outlined/desktop.svg'
import type { IconProps } from '../../types'

export const DesktopOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Desktop, { className: 'desktop-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DesktopOutlined.displayName = 'DesktopOutlined'
