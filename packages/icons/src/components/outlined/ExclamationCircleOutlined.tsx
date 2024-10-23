import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ExclamationCircle from '../../svg/outlined/exclamation-circle.svg'
import type { IconProps } from '../../types'

export const ExclamationCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ExclamationCircle, {
      className: 'exclamation-circle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
