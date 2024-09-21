import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Warning from '../../svg/outlined/warning.svg'
import type { IconProps } from '../../types'

export const WarningOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Warning)
    return <Icon {...props} ref={ref} />
  },
)
