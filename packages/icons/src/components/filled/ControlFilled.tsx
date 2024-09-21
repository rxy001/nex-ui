import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Control from '../../svg/filled/control.svg'
import type { IconProps } from '../../types'

export const ControlFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Control)
    return <Icon {...props} ref={ref} />
  },
)
