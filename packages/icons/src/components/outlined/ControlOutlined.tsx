import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Control from '../../svg/outlined/control.svg'
import type { IconProps } from '../../types'

export const ControlOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Control)
    return <Icon {...props} ref={ref} />
  },
)
