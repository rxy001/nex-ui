import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseCircle from '../../svg/outlined/close-circle.svg'
import type { IconProps } from '../../types'

export const CloseCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloseCircle, { className: 'close-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
