import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import InfoCircle from '../../svg/filled/info-circle.svg'
import type { IconProps } from '../../types'

export const InfoCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(InfoCircle, { className: 'info-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
