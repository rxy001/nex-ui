import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reload from '../../svg/outlined/reload.svg'
import type { IconProps } from '../../types'

export const ReloadOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Reload)
    return <Icon {...props} ref={ref} />
  },
)
