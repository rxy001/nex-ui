import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ellipsis from '../../svg/outlined/ellipsis.svg'
import type { IconProps } from '../../types'

export const EllipsisOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Ellipsis, { className: 'ellipsis-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
