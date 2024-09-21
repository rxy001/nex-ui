import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alert from '../../svg/outlined/alert.svg'
import type { IconProps } from '../../types'

export const AlertOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Alert)
    return <Icon {...props} ref={ref} />
  },
)
