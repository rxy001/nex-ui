import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ungroup from '../../svg/outlined/ungroup.svg'
import type { IconProps } from '../../types'

export const UngroupOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Ungroup, { className: 'ungroup-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
