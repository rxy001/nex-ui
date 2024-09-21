import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Holder from '../../svg/outlined/holder.svg'
import type { IconProps } from '../../types'

export const HolderOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Holder)
    return <Icon {...props} ref={ref} />
  },
)
