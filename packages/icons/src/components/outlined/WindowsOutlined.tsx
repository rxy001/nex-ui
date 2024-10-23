import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Windows from '../../svg/outlined/windows.svg'
import type { IconProps } from '../../types'

export const WindowsOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Windows, { className: 'windows-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
