import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import NodeCollapse from '../../svg/outlined/node-collapse.svg'
import type { IconProps } from '../../types'

export const NodeCollapseOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(NodeCollapse, {
      className: 'node-collapse-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
