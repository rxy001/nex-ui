import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Muted from '../../svg/outlined/muted.svg'
import type { IconProps } from '../../types'

export const MutedOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Muted, { className: 'muted-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
