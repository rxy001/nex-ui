import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Drag from '../../svg/outlined/drag.svg'
import type { IconProps } from '../../types'

export const DragOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Drag, { className: 'drag-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DragOutlined.displayName = 'DragOutlined'
