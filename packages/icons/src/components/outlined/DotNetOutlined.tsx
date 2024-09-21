import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DotNet from '../../svg/outlined/dot-net.svg'
import type { IconProps } from '../../types'

export const DotNetOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DotNet)
    return <Icon {...props} ref={ref} />
  },
)
