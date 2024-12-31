import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ellipsis from '../../svg/outlined/ellipsis.svg'
import type { IconProps } from '../../types'

export const EllipsisOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Ellipsis, { className: 'ellipsis-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

EllipsisOutlined.displayName = 'EllipsisOutlined'
