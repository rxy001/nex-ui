import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pound from '../../svg/outlined/pound.svg'
import type { IconProps } from '../../types'

export const PoundOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Pound, { className: 'pound-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
