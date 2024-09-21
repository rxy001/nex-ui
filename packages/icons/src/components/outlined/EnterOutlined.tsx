import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Enter from '../../svg/outlined/enter.svg'
import type { IconProps } from '../../types'

export const EnterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Enter)
    return <Icon {...props} ref={ref} />
  },
)
