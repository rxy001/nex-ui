import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Subnode from '../../svg/outlined/subnode.svg'
import type { IconProps } from '../../types'

export const SubnodeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Subnode)
    return <Icon {...props} ref={ref} />
  },
)
