import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlignCenter from '../../svg/outlined/align-center.svg'
import type { IconProps } from '../../types'

export const AlignCenterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AlignCenter, { className: 'align-center-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
