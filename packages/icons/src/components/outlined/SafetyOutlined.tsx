import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Safety from '../../svg/outlined/safety.svg'
import type { IconProps } from '../../types'

export const SafetyOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Safety)
    return <Icon {...props} ref={ref} />
  },
)
