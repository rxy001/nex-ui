import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import NodeIndex from '../../svg/outlined/node-index.svg'
import type { IconProps } from '../../types'

export const NodeIndexOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(NodeIndex, { className: 'node-index-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
