import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Linux from '../../svg/outlined/linux.svg'
import type { IconProps } from '../../types'

export const LinuxOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Linux)
    return <Icon {...props} ref={ref} />
  },
)
