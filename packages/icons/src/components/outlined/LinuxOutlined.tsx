import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Linux from '../../svg/outlined/linux.svg'
import type { IconProps } from '../../types'

export const LinuxOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Linux, { className: 'linux-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
