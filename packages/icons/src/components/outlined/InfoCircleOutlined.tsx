import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import InfoCircle from '../../svg/outlined/info-circle.svg'
import type { IconProps } from '../../types'

export const InfoCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(InfoCircle, { className: 'info-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
