import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Moon from '../../svg/outlined/moon.svg'
import type { IconProps } from '../../types'

export const MoonOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Moon, { className: 'moon-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MoonOutlined.displayName = 'MoonOutlined'
