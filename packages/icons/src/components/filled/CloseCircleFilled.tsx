import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloseCircle from '../../svg/filled/close-circle.svg'
import type { IconProps } from '../../types'

export const CloseCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloseCircle, { className: 'close-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
