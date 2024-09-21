import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sisternode from '../../svg/outlined/sisternode.svg'
import type { IconProps } from '../../types'

export const SisternodeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Sisternode)
    return <Icon {...props} ref={ref} />
  },
)
