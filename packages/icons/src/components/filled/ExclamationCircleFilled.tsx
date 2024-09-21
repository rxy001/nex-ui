import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ExclamationCircle from '../../svg/filled/exclamation-circle.svg'
import type { IconProps } from '../../types'

export const ExclamationCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ExclamationCircle)
    return <Icon {...props} ref={ref} />
  },
)
