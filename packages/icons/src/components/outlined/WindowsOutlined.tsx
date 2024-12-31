import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Windows from '../../svg/outlined/windows.svg'
import type { IconProps } from '../../types'

export const WindowsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Windows, { className: 'windows-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WindowsOutlined.displayName = 'WindowsOutlined'
