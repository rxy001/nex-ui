import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import NodeExpand from '../../svg/outlined/node-expand.svg'
import type { IconProps } from '../../types'

export const NodeExpandOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(NodeExpand, { className: 'node-expand-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
