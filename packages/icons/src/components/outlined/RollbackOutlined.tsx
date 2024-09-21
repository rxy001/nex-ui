import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rollback from '../../svg/outlined/rollback.svg'
import type { IconProps } from '../../types'

export const RollbackOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Rollback)
    return <Icon {...props} ref={ref} />
  },
)
