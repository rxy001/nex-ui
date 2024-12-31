import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import NodeExpand from '../../svg/outlined/node-expand.svg'
import type { IconProps } from '../../types'

export const NodeExpandOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(NodeExpand, { className: 'node-expand-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

NodeExpandOutlined.displayName = 'NodeExpandOutlined'
