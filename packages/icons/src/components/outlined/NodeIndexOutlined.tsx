import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import NodeIndex from '../../svg/outlined/node-index.svg'
import type { IconProps } from '../../types'

export const NodeIndexOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(NodeIndex, { className: 'node-index-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

NodeIndexOutlined.displayName = 'NodeIndexOutlined'
